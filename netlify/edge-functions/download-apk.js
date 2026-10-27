const apkUrl = "https://github.com/PedroHda/CarrinhoDeCompras/releases/latest/download/carrinho-de-compras.apk";
const binaryTypes = new Set(["application/vnd.android.package-archive", "application/octet-stream", "application/zip"]);

export function createDownloadHandler(fetcher = fetch) {
  return async (request) => {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    }

    const requestHeaders = new Headers({ "Accept-Encoding": "identity", "Cache-Control": "no-cache" });
    for (const name of ["Range", "If-Range", "If-None-Match", "If-Modified-Since"]) {
      const value = request.headers.get(name);
      if (value) requestHeaders.set(name, value);
    }

    let upstream;
    try {
      // GitHub's CDN rejects suffix ranges; resolve them into an explicit byte range.
      const suffix = requestHeaders.get("Range")?.match(/^bytes=-(\d+)$/);
      if (suffix && request.method === "GET") {
        const metadata = await fetcher(apkUrl, {
          method: "HEAD", redirect: "follow", cache: "no-store", signal: request.signal,
          headers: { "Accept-Encoding": "identity", "Cache-Control": "no-cache" },
        });
        const size = Number(metadata.headers.get("Content-Length"));
        const count = Number(suffix[1]);
        if (metadata.ok && Number.isSafeInteger(size) && size > 0 && Number.isSafeInteger(count) && count > 0) {
          requestHeaders.set("Range", `bytes=${Math.max(0, size - count)}-${size - 1}`);
        }
      }
      upstream = await fetcher(apkUrl, {
        method: request.method,
        headers: requestHeaders,
        redirect: "follow",
        cache: "no-store",
        signal: request.signal,
      });
    } catch {
      return new Response("Download temporarily unavailable. Please try again.", {
        status: 502, headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
      });
    }

    const headers = new Headers({
      "Cache-Control": "no-store, no-transform",
      "Content-Disposition": 'attachment; filename="carrinho-de-compras.apk"',
      "Content-Type": "application/vnd.android.package-archive",
      "X-Content-Type-Options": "nosniff",
    });
    for (const name of ["Content-Length", "Content-Range", "Accept-Ranges", "ETag", "Last-Modified"]) {
      const value = upstream.headers.get(name);
      if (value) headers.set(name, value);
    }

    if (upstream.status === 304) return new Response(null, { status: 304, headers });
    if (upstream.status === 416) {
      await upstream.body?.cancel();
      headers.delete("Content-Length");
      return new Response(null, { status: 416, headers });
    }

    const contentType = upstream.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase();
    if (!upstream.ok || !binaryTypes.has(contentType)) {
      await upstream.body?.cancel();
      return new Response("Could not retrieve the APK. Please try again.", {
        status: upstream.status === 404 ? 404 : 502,
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
      });
    }

    // Fetch can decode an encoded upstream body; its original length would then be wrong.
    const encoding = upstream.headers.get("Content-Encoding");
    if (encoding && encoding !== "identity") headers.delete("Content-Length");

    // Return the stream directly: the 113 MB APK is never buffered in the function.
    return new Response(request.method === "HEAD" ? null : upstream.body, { status: upstream.status, headers });
  };
}

export default createDownloadHandler();

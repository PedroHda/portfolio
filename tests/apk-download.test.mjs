import assert from "node:assert/strict";
import { test } from "node:test";
import { createDownloadHandler } from "../netlify/edge-functions/download-apk.js";

const url = "https://portfolio.example/downloads/carrinho-de-compras.apk";
const apkHeaders = { "Content-Type": "application/vnd.android.package-archive", "Accept-Ranges": "bytes" };

test("serves the APK on the portfolio domain without exposing an upstream redirect", async () => {
  const bytes = new Uint8Array([0x50, 0x4b, 0x03, 0x04]);
  const handler = createDownloadHandler(async (upstreamUrl, options) => {
    assert.equal(upstreamUrl, "https://github.com/PedroHda/CarrinhoDeCompras/releases/latest/download/carrinho-de-compras.apk");
    assert.equal(options.redirect, "follow");
    assert.equal(options.cache, "no-store");
    assert.equal(options.headers.get("Accept-Encoding"), "identity");
    return new Response(bytes, { headers: { ...apkHeaders, "Content-Length": "4", Location: "https://github.com/" } });
  });
  const response = await handler(new Request(url));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Location"), null);
  assert.equal(response.headers.get("Content-Disposition"), 'attachment; filename="carrinho-de-compras.apk"');
  assert.equal(response.headers.get("Content-Length"), "4");
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()), bytes);
});

test("returns an open stream immediately instead of buffering the APK", { timeout: 1000 }, async () => {
  let source;
  const stream = new ReadableStream({ start(controller) { source = controller; controller.enqueue(new Uint8Array([1])); } });
  const handler = createDownloadHandler(async () => new Response(stream, { headers: apkHeaders }));
  const response = await handler(new Request(url));
  const reader = response.body.getReader();
  assert.deepEqual((await reader.read()).value, new Uint8Array([1]));
  source.enqueue(new Uint8Array([2]));
  source.close();
  assert.deepEqual((await reader.read()).value, new Uint8Array([2]));
  assert.equal((await reader.read()).done, true);
});

test("preserves byte ranges so Android can resume and finish a partial download", async () => {
  const handler = createDownloadHandler(async (_, options) => {
    assert.equal(options.headers.get("Range"), "bytes=4-7");
    assert.equal(options.headers.get("If-Range"), '"apk-v1"');
    assert.equal(options.headers.get("Cookie"), null);
    return new Response(new Uint8Array([4, 5, 6, 7]), {
      status: 206, headers: { ...apkHeaders, "Content-Range": "bytes 4-7/8", "Content-Length": "4", ETag: '"apk-v1"' },
    });
  });
  const response = await handler(new Request(url, { headers: { Range: "bytes=4-7", "If-Range": '"apk-v1"', Cookie: "private=1" } }));
  assert.equal(response.status, 206);
  assert.equal(response.headers.get("Content-Range"), "bytes 4-7/8");
  assert.equal(response.headers.get("Content-Length"), "4");
  assert.equal(response.headers.get("Accept-Ranges"), "bytes");
  assert.deepEqual([...new Uint8Array(await response.arrayBuffer())], [4, 5, 6, 7]);
});

test("HEAD exposes the exact APK size without downloading its body", async () => {
  const handler = createDownloadHandler(async (_, options) => {
    assert.equal(options.method, "HEAD");
    return new Response(null, { headers: { ...apkHeaders, "Content-Length": "113585706" } });
  });
  const response = await handler(new Request(url, { method: "HEAD" }));
  assert.equal(response.headers.get("Content-Length"), "113585706");
  assert.equal(response.body, null);
});

test("normalizes suffix ranges for GitHub's CDN", async () => {
  const methods = [];
  const handler = createDownloadHandler(async (_, options) => {
    methods.push(options.method);
    if (options.method === "HEAD") return new Response(null, { headers: { ...apkHeaders, "Content-Length": "8" } });
    assert.equal(options.headers.get("Range"), "bytes=4-7");
    return new Response(new Uint8Array([4, 5, 6, 7]), { status: 206,
      headers: { ...apkHeaders, "Content-Length": "4", "Content-Range": "bytes 4-7/8" } });
  });
  const response = await handler(new Request(url, { headers: { Range: "bytes=-4" } }));
  assert.deepEqual(methods, ["HEAD", "GET"]);
  assert.equal(response.status, 206);
  assert.deepEqual([...new Uint8Array(await response.arrayBuffer())], [4, 5, 6, 7]);
});

test("does not advertise a compressed content length for a decoded stream", async () => {
  const handler = createDownloadHandler(async () => new Response(new Uint8Array([1, 2, 3]), {
    headers: { ...apkHeaders, "Content-Encoding": "gzip", "Content-Length": "20" },
  }));
  const response = await handler(new Request(url));
  assert.equal(response.headers.get("Content-Length"), null);
  assert.equal(response.headers.get("Content-Encoding"), null);
});

test("returns download errors as errors instead of saving a GitHub HTML page as an APK", async () => {
  for (const upstream of [new Response("not found", { status: 404 }), new Response("<html>Login</html>", { headers: { "Content-Type": "text/html" } })]) {
    const handler = createDownloadHandler(async () => upstream);
    const response = await handler(new Request(url));
    assert.ok([404, 502].includes(response.status));
    assert.equal(response.headers.get("Content-Disposition"), null);
    assert.equal(response.headers.get("Location"), null);
  }
  const unavailable = await createDownloadHandler(async () => { throw new Error("offline"); })(new Request(url));
  assert.equal(unavailable.status, 502);
});

test("preserves unsatisfiable range responses without forwarding an error body", async () => {
  const handler = createDownloadHandler(async () => new Response("range error", { status: 416,
    headers: { "Content-Range": "bytes */8", "Content-Length": "11" } }));
  const response = await handler(new Request(url, { headers: { Range: "bytes=8-" } }));
  assert.equal(response.status, 416);
  assert.equal(response.headers.get("Content-Range"), "bytes */8");
  assert.equal(response.headers.get("Content-Length"), null);
  assert.equal(response.body, null);
});

test("rejects unsupported methods without contacting GitHub", async () => {
  const handler = createDownloadHandler(async () => { throw new Error("must not be called"); });
  const response = await handler(new Request(url, { method: "POST" }));
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("Allow"), "GET, HEAD");
});

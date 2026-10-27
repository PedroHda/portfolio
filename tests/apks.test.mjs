import assert from "node:assert/strict";
import { test } from "node:test";
import { apkLookupFailed, apkVersion, compareVersions, createApkLoader, discoverLatestApk, initialApkStates, selectLatestApk } from "../src/services/github-apks.ts";
import { publishedApks } from "../src/data/published-apks.ts";
import { apkSources } from "../src/data/apk-sources.ts";

const root = "https://api.github.com/repos/PedroHda/Example";
const commitSha = "a".repeat(40);
const file = (version, overrides = {}) => ({
  href: "https://github.com/PedroHda/Example/releases/download/v1.0.0/Example.apk",
  filename: `Example-${version}.apk`, version, sizeBytes: 1_234_567,
  prerelease: false, publishedAt: "2026-10-20T12:00:00Z", source: "release", ...overrides,
});
const release = (version, names = [`Example-${version}.apk`], overrides = {}) => ({
  draft: false, prerelease: false, tag_name: `v${version}`, published_at: "2026-10-20T12:00:00Z",
  assets: names.map((name) => ({ name, size: 1_234_567, state: "uploaded", updated_at: "2026-10-20T12:00:00Z",
    browser_download_url: `https://github.com/PedroHda/Example/releases/download/v${version}/${name}` })), ...overrides,
});
const entry = (name, size = 2_000_000) => ({ path: `downloads/${name}`, type: "blob", mode: "100644", size });

function github({ releases = [], latest, tree = [], truncated = false, pages, failure, status = 503 } = {}) {
  const calls = [];
  const fetcher = async (url, init) => {
    calls.push(url);
    assert.equal(init.cache, "no-store");
    if (failure && url.includes(failure)) return new Response(null, { status });
    if (url.endsWith("/releases/latest")) return latest ? Response.json(latest) : new Response(null, { status: 404 });
    if (url.includes("/releases?")) {
      const page = Number(new URL(url).searchParams.get("page") ?? 1);
      const headers = pages && page < pages.length ? { link: `<${root}/releases?per_page=100&page=${page + 1}>; rel="next"` } : {};
      return Response.json(pages ? pages[page - 1] : releases, { headers });
    }
    if (url.includes("/git/trees/")) return Response.json({ tree, truncated });
    if (url.includes("/commits?")) return Response.json([{ sha: commitSha, commit: { committer: { date: "2026-10-26T10:00:00Z" } } }]);
    throw new Error(`Unexpected GitHub request: ${url}`);
  };
  return { calls, fetcher };
}

test("recognizes nome-versão.apk and existing filename/tag formats", () => {
  assert.equal(apkVersion("MeuApp-1.10.0.apk"), "1.10.0");
  assert.equal(apkVersion("NossoCasamento-v2.0.0-demo.apk"), "2.0.0");
  assert.equal(apkVersion("carrinho-de-compras-1.2.0-teste.apk"), "1.2.0");
  assert.equal(apkVersion("android-v1.0.0"), "1.0.0");
  assert.equal(apkVersion("MeuApp-2.0.0-beta.10.APK"), "2.0.0-beta.10");
  assert.equal(apkVersion("MeuApp.apk"), undefined);
});

test("all four published APKs are available before any GitHub request", () => {
  const projects = Object.entries(apkSources).map(([repository, apkSource]) => ({ repository, apkSource }));
  const states = initialApkStates(projects, publishedApks);
  assert.deepEqual(Object.entries(states).filter(([, state]) => state.status === "ready").map(([repository]) => repository),
    ["MDReader", "CarrinhoDeCompras", "NossoCasamento", "ProjetoVan"]);
  assert.equal(states.ColoringGame.status, "missing");
  assert.equal(states.CarrinhoDeCompras.file.variant, undefined);
});

test("failed metadata checks keep published APKs available even after a loading state", () => {
  for (const apk of Object.values(publishedApks).filter(Boolean)) {
    assert.deepEqual(apkLookupFailed({ status: "loading", file: apk }), { status: "ready", file: apk });
    assert.deepEqual(apkLookupFailed({ status: "ready", file: apk }), { status: "ready", file: apk });
  }
  assert.deepEqual(apkLookupFailed(), { status: "error" });
  assert.deepEqual(apkLookupFailed({ status: "loading" }), { status: "error" });
});

test("published metadata respects the original APK restriction and does not invent downloads for new projects", () => {
  const states = initialApkStates([
    { repository: "Example", apkSource: { variant: "standard" } },
    { repository: "NewApp", apkSource: {} }, { repository: "Website" },
    { repository: "Canonical", apkSource: { releaseAsset: "app.apk" } },
  ], { Example: file("2.0.0", { variant: "test" }), Canonical: file("1.0.0") });
  assert.equal(states.Example.status, "loading");
  assert.equal(states.Example.file, undefined);
  assert.equal(states.Canonical.status, "loading");
  assert.equal(states.Canonical.file, undefined);
  assert.equal(states.NewApp.status, "loading");
  assert.equal(states.Website, undefined);
});

test("compares version numbers and prereleases numerically", () => {
  assert.ok(compareVersions("1.10.0", "1.9.0") > 0);
  assert.ok(compareVersions("2.0.0", "1.99.99") > 0);
  assert.ok(compareVersions("2.0.0", "2.0.0-rc.1") > 0);
  assert.ok(compareVersions("2.0.0-beta.10", "2.0.0-beta.2") > 0);
  assert.equal(compareVersions("1.2", "1.2.0"), 0);
});

test("highest version wins over newer timestamps, filenames and array order", () => {
  const latest = file("1.10.0", { publishedAt: "2026-10-01T10:00:00Z" });
  assert.equal(selectLatestApk([
    file("1.9.0", { publishedAt: "2026-10-26T10:00:00Z" }), latest,
    file(undefined, { publishedAt: "2026-10-27T10:00:00Z" }),
  ]), latest);
  const testBuild = file("1.10.0", { variant: "test" });
  assert.equal(selectLatestApk([file("1.10.0"), testBuild], { preferredVariant: "test" }), testBuild);
  assert.equal(selectLatestApk([file("1.9.0", { variant: "test" }), latest], { preferredVariant: "test" }), latest);
});

test("discovers new release filenames and includes public prereleases", async () => {
  const { fetcher } = github({ releases: [
    release("1.1.0"), release("1.2.0", ["Example-1.2.0.apk", "Example-1.2.0-teste.apk", "notes.md"], { prerelease: true }),
    release("99.0.0", undefined, { draft: true }),
  ] });
  const apk = await discoverLatestApk("PedroHda", "Example", { preferredVariant: "test" }, fetcher);
  assert.equal(apk.version, "1.2.0");
  assert.equal(apk.filename, "Example-1.2.0-teste.apk");
  assert.equal(apk.variant, "test");
  assert.equal(apk.prerelease, true);
  assert.equal(apk.sizeBytes, 1_234_567);
});

test("standard APK selection excludes test and demo builds regardless of version or publication date", () => {
  const standard = file("1.2.0");
  const variants = [
    file("1.2.0", { variant: "test", publishedAt: "2026-10-27T00:28:59Z" }),
    file("2.0.0", { variant: "test" }), file("3.0.0", { variant: "demo" }),
  ];
  assert.equal(selectLatestApk([...variants, standard], { variant: "standard" }), standard);
  assert.equal(selectLatestApk(variants, { variant: "standard" }), null);
});

test("canonical release metadata stays aligned with latest download instead of a newer repository APK", async () => {
  const { fetcher, calls } = github({
    latest: release("1.2.0", ["Example.apk", "Example-teste-1.2.0.apk"]),
    releases: [release("3.0.0", undefined, { prerelease: true })],
    tree: [entry("Example-4.0.0.apk")],
  });
  const apk = await discoverLatestApk("PedroHda", "Example", { variant: "standard", releaseAsset: "Example.apk" }, fetcher);
  assert.equal(apk.version, "1.2.0");
  assert.equal(apk.filename, "Example.apk");
  assert.equal(apk.href, "https://github.com/PedroHda/Example/releases/download/v1.2.0/Example.apk");
  assert.equal(apk.source, "release");
  assert.deepEqual(calls, [`${root}/releases/latest`]);
});

test("canonical release lookup never replaces a missing stable asset with a different build", async () => {
  for (const latest of [undefined, release("1.2.0", ["Example-teste-1.2.0.apk"]),
    release("2.0.0", ["Example.apk"], { prerelease: true }),
    release("2.0.0", ["Example.apk"], { draft: true })]) {
    const { fetcher } = github({ latest, releases: [release("1.1.0")] });
    assert.equal(await discoverLatestApk("PedroHda", "Example", { releaseAsset: "Example.apk" }, fetcher), null);
  }
});

test("discovers the original release APK when test filenames put teste before or after the version", async () => {
  const { fetcher } = github({ releases: [
    release("1.2.0", ["carrinho-de-compras-1.2.0.apk", "carrinho-de-compras-teste-1.2.0.apk"]),
    release("1.3.0", ["carrinho-de-compras-1.3.0-teste.apk"]),
    release("2.0.0", ["carrinho-de-compras-2.0.0-demo.apk"]),
  ] });
  const apk = await discoverLatestApk("PedroHda", "Example", { variant: "standard" }, fetcher);
  assert.equal(apk.filename, "carrinho-de-compras-1.2.0.apk");
  assert.equal(apk.variant, undefined);
  assert.equal(apk.version, "1.2.0");
});

test("a newer repository test build does not hide the latest original APK", async () => {
  const { fetcher, calls } = github({ releases: [release("1.1.0")], tree: [
    entry("Example-1.2.0.apk"), entry("Example-teste-2.0.0.apk"), entry("Example-3.0.0-demo.apk"),
  ] });
  const apk = await discoverLatestApk("PedroHda", "Example", { variant: "standard" }, fetcher);
  assert.equal(apk.filename, "Example-1.2.0.apk");
  assert.equal(apk.source, "repository");
  assert.equal(calls.filter((url) => url.includes("/commits?")).length, 1);
});

test("discovers higher-version APKs in any repository folder and uses their own commit", async () => {
  const { fetcher, calls } = github({ releases: [release("1.0.0")], tree: [
    entry("Example-1.9.0.apk"), entry("Example-1.10.0.apk"), entry("notes.md"),
  ] });
  const apk = await discoverLatestApk("PedroHda", "Example", {}, fetcher);
  assert.equal(apk.version, "1.10.0");
  assert.equal(apk.filename, "Example-1.10.0.apk");
  assert.equal(apk.source, "repository");
  assert.equal(apk.href, `https://raw.githubusercontent.com/PedroHda/Example/${commitSha}/downloads/Example-1.10.0.apk`);
  assert.equal(calls.filter((url) => url.includes("/commits?")).length, 1);
});

test("falls back to release tags and to unversioned legacy APKs", async () => {
  const tagged = github({ releases: [release("1.0.0", ["Example.apk"])] });
  assert.equal((await discoverLatestApk("PedroHda", "Example", {}, tagged.fetcher)).version, "1.0.0");
  const legacy = github({ tree: [entry("Example.apk")] });
  const apk = await discoverLatestApk("PedroHda", "Example", {}, legacy.fetcher);
  assert.equal(apk.filename, "Example.apk");
  assert.equal(apk.version, undefined);
});

test("does not require an existing APK and follows release pagination", async () => {
  const empty = github();
  assert.equal(await discoverLatestApk("PedroHda", "Example", {}, empty.fetcher), null);
  const paginated = github({ pages: [[release("1.1.0")], [release("1.10.0")]] });
  assert.equal((await discoverLatestApk("PedroHda", "Example", {}, paginated.fetcher)).version, "1.10.0");
});

test("refuses partial lookups, rate limits and truncated trees instead of returning an old file", async () => {
  for (const options of [
    { failure: "/releases?", status: 403 }, { failure: "/git/trees/" },
    { failure: "/commits?", tree: [entry("Example-2.0.0.apk")] }, { truncated: true },
  ]) {
    const { fetcher } = github({ releases: [release("1.0.0")], ...options });
    await assert.rejects(discoverLatestApk("PedroHda", "Example", {}, fetcher));
  }
});

test("reuses background lookups but refreshes on demand and never reuses a stale file after failure", async () => {
  let version = "1.0.0";
  let requests = 0;
  let fail = false;
  const load = createApkLoader(async () => {
    requests++;
    if (fail) throw new Error("offline");
    return file(version);
  });
  await Promise.all([load("PedroHda", "Example", {}), load("PedroHda", "Example", {})]);
  assert.equal(requests, 1);
  version = "2.0.0";
  assert.equal((await load("PedroHda", "Example", {}, true)).version, "2.0.0");
  fail = true;
  await assert.rejects(load("PedroHda", "Example", {}, true));
  await assert.rejects(load("PedroHda", "Example", {}));
  fail = false;
  version = "3.0.0";
  assert.equal((await load("PedroHda", "Example", {}, true)).version, "3.0.0");
});

test("revalidates expired lookups when returning to the page and shares concurrent checks", async (t) => {
  let now = 0;
  t.mock.method(Date, "now", () => now);
  let requests = 0;
  let version = "1.0.0";
  let fail = false;
  const load = createApkLoader(async () => {
    requests++;
    if (fail) throw new Error("offline");
    return file(version);
  });

  await load("PedroHda", "Example", {});
  version = "2.0.0";
  now = 5 * 60_000 - 1;
  assert.equal((await load("PedroHda", "Example", {})).version, "1.0.0");
  assert.equal(requests, 1);

  now++;
  const results = await Promise.all([
    load("PedroHda", "Example", {}), load("PedroHda", "Example", {}),
  ]);
  assert.ok(results.every((apk) => apk.version === "2.0.0"));
  assert.equal(requests, 2);

  now += 5 * 60_000;
  fail = true;
  await assert.rejects(load("PedroHda", "Example", {}));
  fail = false;
  version = "3.0.0";
  assert.equal((await load("PedroHda", "Example", {})).version, "3.0.0");
});

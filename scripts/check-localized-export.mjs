import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { defaultLocale, localeDefinitions, supportedLocales } from "../src/i18n/config.ts";
import { publishedApks } from "../src/data/published-apks.ts";

const root = path.resolve("out");
const slugs = Object.keys(JSON.parse(readFileSync("src/i18n/locales/pt-BR/projects.json", "utf8")).items);
let checkedPages = 0;
let checkedReferences = 0;
const netlifyConfig = readFileSync("netlify.toml", "utf8");
const redirects = [...netlifyConfig.matchAll(/\[\[redirects\]\]([\s\S]*?)(?=\n\[|$)/g)]
  .map((match) => ({
    from: match[1].match(/^\s*from\s*=\s*"([^"]+)"/m)?.[1],
    to: match[1].match(/^\s*to\s*=\s*"([^"]+)"/m)?.[1],
    status: Number(match[1].match(/^\s*status\s*=\s*(\d+)/m)?.[1]),
  }));
const cartDownload = "/downloads/carrinho-de-compras.apk";
const downloadLinks = {
  mdreader: publishedApks.MDReader.href,
  "carrinho-de-compras": cartDownload,
  "nosso-casamento": publishedApks.NossoCasamento.href,
  "projeto-van": publishedApks.ProjetoVan.href,
};
assert.ok(redirects.some((redirect) => redirect.from === cartDownload && redirect.status === 302
  && redirect.to === "https://github.com/PedroHda/CarrinhoDeCompras/releases/latest/download/carrinho-de-compras.apk"),
"Carrinho must redirect directly to the canonical normal APK, not a GitHub page");

const originalHome = readFileSync(path.join(root, "index.html"), "utf8");
const fiverrUrl = originalHome.match(/href="([^"]*fiverr\.com[^\"]*)"/)?.[1];

for (const locale of supportedLocales) {
  const prefix = localeDefinitions[locale].pathPrefix;
  const common = JSON.parse(readFileSync(`src/i18n/locales/${locale}/common.json`, "utf8"));
  const projectMessages = JSON.parse(readFileSync(`src/i18n/locales/${locale}/projects.json`, "utf8")).items;
  for (const slug of [null, ...slugs]) {
    const route = `${prefix}${slug ? `/projetos/${slug}` : ""}` || "/";
    const file = path.join(root, route === "/" ? "index.html" : `${route}.html`);
    assert.ok(existsSync(file), `Missing exported route: ${route}`);
    const html = readFileSync(file, "utf8");
    const body = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "");
    assert.ok(html.includes(`lang="${locale}"`), `Wrong document language: ${route}`);
    assert.ok(body.includes(common.language.label), `Wrong language selector label: ${route}`);
    if (!slug || downloadLinks[slug]) {
      assert.ok(body.includes(common.download.available), `Missing published APK availability: ${route}`);
      const anchors = [...body.matchAll(/<a\b[^>]*>/g)].map((match) => match[0]);
      for (const [projectSlug, href] of Object.entries(downloadLinks)) {
        if (slug && slug !== projectSlug) continue;
        const link = anchors.find((anchor) => anchor.includes(`href="${href}"`));
        assert.ok(link?.includes("download="), `Missing native APK download before GitHub discovery: ${projectSlug} on ${route}`);
      }
    }
    if (slug === "coloring-game") {
      assert.ok(body.includes(common.download.notPublished), `An unpublished project must not invent an APK: ${route}`);
    }
    assert.doesNotMatch(body, /(?:home|profile|projects):(?:hero|items|experiences|education)\./, route);
    if (slug) {
      const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
      assert.equal(description, projectMessages[slug].description, `Wrong metadata: ${route}`);
      assert.ok(body.includes(common.projects.overview), `Missing translated project heading: ${route}`);
    } else {
      assert.ok(body.includes(common.metadata.title), `Wrong home title: ${route}`);
      if (fiverrUrl) assert.ok(body.includes(fiverrUrl), "Fiverr link differs between languages");
    }
    for (const [, raw] of body.matchAll(/(?:href|src)="(\/[^"<>]*)"/g)) {
      const url = decodeURIComponent(raw.split(/[?#]/)[0]);
      if (!url || url.startsWith("//")) continue;
      const target = path.join(root, url);
      assert.ok(redirects.some((redirect) => redirect.from === url)
        || [target, `${target}.html`, path.join(target, "index.html")].some((candidate) => existsSync(candidate) && statSync(candidate).isFile()), `Broken reference ${url} on ${route}`);
      if (raw.startsWith("/#") && locale !== defaultLocale) assert.fail(`Default-language navigation link on ${route}: ${raw}`);
      checkedReferences++;
    }
    if (slug === "mdreader") {
      assert.ok(body.includes(projectMessages.mdreader.download.requirements));
      assert.ok(body.includes(publishedApks.MDReader.filename));
      assert.ok(!body.includes("releases/download/android-v1.0.0/MDReader.apk"), "Static HTML must not pin an old APK");
    }
    if (slug === "carrinho-de-compras") {
      const link = body.match(/<a\b[^>]*href="\/downloads\/carrinho-de-compras\.apk"[^>]*>/)?.[0];
      assert.ok(link, `Carrinho download must be available before GitHub discovery: ${route}`);
      assert.doesNotMatch(link, /target="_blank"/, "APK download must keep the native click in the current tab");
      assert.ok(link.includes("download="), "Carrinho must expose a native download link");
    }
    checkedPages++;
  }
}

console.log(`Checked ${checkedPages} localized pages and ${checkedReferences} internal references.`);

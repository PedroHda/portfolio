import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { createInstance } from "i18next";
import {
  defaultLocale, i18nSettings, isLocale, localizePath,
  prefixedLocales, resolveLocale, supportedLocales,
} from "../src/i18n/config.ts";

const namespaces = ["common", "home", "profile", "projects"];
const resources = Object.fromEntries(supportedLocales.map((locale) => [
  locale,
  Object.fromEntries(namespaces.map((namespace) => [
    namespace,
    JSON.parse(readFileSync(new URL(`../src/i18n/locales/${locale}/${namespace}.json`, import.meta.url), "utf8")),
  ])),
]));

function leaves(value, prefix = "", result = {}) {
  if (typeof value === "string") {
    assert.ok(value.trim(), `Empty translation: ${prefix}`);
    result[prefix] = [...value.matchAll(/{{\s*(\w+)\s*}}/g)].map((match) => match[1]).sort();
  } else {
    for (const [key, child] of Object.entries(value)) leaves(child, `${prefix}.${key}`, result);
  }
  return result;
}

test("registered languages match the translation catalogs", () => {
  assert.ok(supportedLocales.includes("pt-BR"));
  assert.ok(supportedLocales.includes("en"));
  assert.equal(defaultLocale, "pt-BR");
  assert.deepEqual(prefixedLocales, supportedLocales.filter((locale) => locale !== defaultLocale));
  assert.deepEqual(readdirSync(new URL("../src/i18n/locales/", import.meta.url)).sort(), [...supportedLocales].sort());
});

test("switching language preserves the current project, query and anchor", () => {
  assert.equal(localizePath("/projetos/mdreader?from=home#download-title", "en"), "/en/projetos/mdreader?from=home#download-title");
  assert.equal(localizePath("/en/projetos/mdreader?from=home#download-title", "pt-BR"), "/projetos/mdreader?from=home#download-title");
  assert.equal(localizePath("/#projetos", "en"), "/en#projetos");
  assert.equal(localizePath("/en#projetos", "pt-BR"), "/#projetos");
  assert.equal(localizePath("/en/projetos/mdreader", "en"), "/en/projetos/mdreader");
  assert.equal(localizePath("/english", "en"), "/en/english");
  assert.throws(() => localizePath("//external.example", "en"));
  assert.throws(() => localizePath("https://external.example", "en"));
});

test("unsupported languages fall back to Brazilian Portuguese", () => {
  assert.equal(isLocale("en"), true);
  assert.equal(isLocale("not-a-language"), false);
  assert.equal(resolveLocale("unknown"), "pt-BR");
  assert.equal(resolveLocale(), "pt-BR");
});

test("both catalogs have complete matching keys and interpolation variables", () => {
  for (const namespace of namespaces) {
    assert.deepEqual(leaves(resources.en[namespace]), leaves(resources[defaultLocale][namespace]), namespace);
  }
});

test("i18next handles plural forms, fallback and independent language instances", async () => {
  const [pt, en] = await Promise.all(supportedLocales.map(async (lng) => {
    const instance = createInstance();
    await instance.init({ ...i18nSettings, resources, lng });
    return instance;
  }));
  assert.equal(pt.t("filters.results", { count: 1, filter: "Jogos" }), "1 projeto exibido. Filtro: Jogos.");
  assert.equal(en.t("filters.results", { count: 2, filter: "Apps" }), "2 projects shown. Filter: Apps.");
  assert.equal(en.t("theme.light"), "Light");
  await pt.changeLanguage("unsupported");
  assert.equal(pt.t("theme.light"), "Claro");
  assert.equal(en.t("theme.light"), "Light");
  assert.equal(new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(62.631), "62,6");
  assert.equal(new Intl.NumberFormat("en", { maximumFractionDigits: 1 }).format(62.631), "62.6");
});

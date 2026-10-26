import type { InitOptions } from "i18next";

export const localeDefinitions = {
  "pt-BR": {
    label: "Português (Brasil)",
    shortLabel: "PT-BR",
    pathPrefix: "",
    openGraphLocale: "pt_BR",
    direction: "ltr",
  },
  en: {
    label: "English",
    shortLabel: "EN",
    pathPrefix: "/en",
    openGraphLocale: "en_US",
    direction: "ltr",
  },
} as const;

export type Locale = keyof typeof localeDefinitions;
export const defaultLocale: Locale = "pt-BR";
export const supportedLocales = Object.keys(localeDefinitions) as Locale[];
export const prefixedLocales = supportedLocales.filter((locale) => locale !== defaultLocale);

export function isLocale(value: string): value is Locale {
  return Object.hasOwn(localeDefinitions, value);
}

export function resolveLocale(value?: string): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

/** Changes only the locale prefix; keeps the page, query string and anchor. */
export function localizePath(path: string, locale: Locale): string {
  const suffixIndex = path.search(/[?#]/);
  const tail = suffixIndex < 0 ? "" : path.slice(suffixIndex);
  let neutralPath = (suffixIndex < 0 ? path : path.slice(0, suffixIndex)) || "/";
  if (!neutralPath.startsWith("/") || neutralPath.startsWith("//")) {
    throw new Error("A locale path must be an internal absolute path.");
  }
  for (const candidate of prefixedLocales) {
    const prefix = localeDefinitions[candidate].pathPrefix;
    if (neutralPath === prefix || neutralPath.startsWith(`${prefix}/`)) {
      neutralPath = neutralPath.slice(prefix.length) || "/";
      break;
    }
  }
  const prefix = localeDefinitions[locale].pathPrefix;
  return `${prefix}${neutralPath === "/" ? (prefix ? "" : "/") : neutralPath}${tail}`;
}

export const i18nSettings: InitOptions = {
  fallbackLng: defaultLocale,
  supportedLngs: supportedLocales,
  load: "currentOnly",
  defaultNS: "common",
  ns: ["common", "home", "profile", "projects"],
  initAsync: false,
  interpolation: { escapeValue: false },
  returnNull: false,
};

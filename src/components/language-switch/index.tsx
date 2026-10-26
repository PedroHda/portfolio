"use client";

import { Languages } from "lucide-react";
import { isLocale, localeDefinitions, localizePath, supportedLocales } from "@/i18n/config";
import { useI18n } from "@/i18n/use-i18n";

export function LanguageSwitch() {
  const { t, locale } = useI18n();

  return (
    <label className="language-switch">
      <Languages size={16} aria-hidden="true" />
      <span className="sr-only">{t("language.label")}</span>
      <select
        value={locale}
        aria-label={t("language.label")}
        onChange={(event) => {
          const nextLocale = event.target.value;
          if (!isLocale(nextLocale) || nextLocale === locale) return;
          const currentPage = window.location.pathname + window.location.search + window.location.hash;
          window.location.assign(localizePath(currentPage, nextLocale));
        }}
      >
        {supportedLocales.map((language) => (
          <option key={language} value={language} lang={language}>
            {localeDefinitions[language].shortLabel}
          </option>
        ))}
      </select>
    </label>
  );
}

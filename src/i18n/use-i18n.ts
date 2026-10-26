"use client";

import { useTranslation } from "react-i18next";
import { resolveLocale } from "./config";

export function useI18n() {
  const { t, i18n } = useTranslation(["common", "home", "profile", "projects"]);
  return { t, locale: resolveLocale(i18n.resolvedLanguage ?? i18n.language) };
}

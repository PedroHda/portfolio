import { createInstance } from "i18next";
import { resources } from "./resources";
import { i18nSettings } from "./config";
import type { Locale } from "./config";

export async function getTranslations(locale: Locale) {
  // Never share mutable language state between pages being built concurrently.
  const instance = createInstance();
  await instance.init({ ...i18nSettings, resources, lng: locale });
  return instance.getFixedT(locale);
}

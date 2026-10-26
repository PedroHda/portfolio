"use client";

import { createInstance } from "i18next";
import { useState, type ReactNode } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { i18nSettings } from "./config";
import type { Locale } from "./config";
import type { LocaleMessages } from "./resources";

type I18nProviderProps = {
  locale: Locale;
  messages: Record<string, LocaleMessages>;
  children: ReactNode;
};

export function I18nProvider({ locale, messages, children }: I18nProviderProps) {
  const [instance] = useState(() => {
    const i18n = createInstance();
    void i18n.use(initReactI18next).init({
      ...i18nSettings,
      lng: locale,
      resources: messages,
      react: { useSuspense: false },
    });
    return i18n;
  });

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}

import type { ReactNode } from "react";
import { I18nProvider } from "@/i18n/provider";
import { resources } from "@/i18n/resources";
import { defaultLocale, localeDefinitions, type Locale } from "@/i18n/config";
import "@/styles/globals.css";

export function DocumentLayout({ children, locale }: { children: ReactNode; locale: Locale }) {
  const themeScript = `
    (() => {
      try {
        const storedTheme = localStorage.getItem("theme");
        const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        const theme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : systemTheme;
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
      } catch {
        document.documentElement.dataset.theme = "light";
      }
    })();
  `;


  const messages = locale === defaultLocale
    ? { [locale]: resources[locale] }
    : { [defaultLocale]: resources[defaultLocale], [locale]: resources[locale] };

  return (
    <html lang={locale} dir={localeDefinitions[locale].direction} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body><I18nProvider locale={locale} messages={messages}>{children}</I18nProvider></body>
    </html>
  );
}

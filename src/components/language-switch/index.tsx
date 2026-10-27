"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, Languages } from "lucide-react";
import { isLocale, localeDefinitions, localizePath, supportedLocales } from "@/i18n/config";
import { useI18n } from "@/i18n/use-i18n";

export function LanguageSwitch() {
  const { t, locale } = useI18n();

  return (
    <Select.Root
      value={locale}
      dir={localeDefinitions[locale].direction}
      onValueChange={(nextLocale) => {
        if (!isLocale(nextLocale) || nextLocale === locale) return;
        const currentPage = window.location.pathname + window.location.search + window.location.hash;
        window.location.assign(localizePath(currentPage, nextLocale));
      }}
    >
      <Select.Trigger className="language-switch" aria-label={t("language.label")}>
        <Languages className="language-switch-symbol" size={17} aria-hidden="true" />
        <Select.Value>{localeDefinitions[locale].shortLabel}</Select.Value>
        <Select.Icon className="language-switch-chevron">
          <ChevronDown size={14} aria-hidden="true" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="language-switch-menu" position="popper" align="end"
          sideOffset={10} collisionPadding={16}>
          <Select.Viewport>
            <Select.Group>
              <Select.Label className="language-switch-label">{t("language.label")}</Select.Label>
              {supportedLocales.map((language) => (
                <Select.Item className="language-switch-item" key={language} value={language}
                  textValue={localeDefinitions[language].label}>
                  <span className="language-switch-code" aria-hidden="true">
                    {localeDefinitions[language].shortLabel}
                  </span>
                  <Select.ItemText>
                    <span lang={language}>{localeDefinitions[language].label}</span>
                  </Select.ItemText>
                  <Select.ItemIndicator className="language-switch-check">
                    <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

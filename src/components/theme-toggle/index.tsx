"use client";

import { useI18n } from "@/i18n/use-i18n";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem("theme");
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function ThemeToggle() {
  const { t } = useI18n();
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const initialTheme = getStoredTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  function selectTheme(nextTheme: Theme) {
    setTheme(nextTheme);
    window.localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <div className="theme-switch" aria-label={t("theme.label")}>
      <button
        type="button"
        aria-label={t("theme.useLight")}
        aria-pressed={theme === "light"}
        data-theme-option="light"
        className={theme === "light" ? "active" : ""}
        onClick={() => selectTheme("light")}
      >
        <Sun size={16} />
        <span>{t("theme.light")}</span>
      </button>
      <button
        type="button"
        aria-label={t("theme.useDark")}
        aria-pressed={theme === "dark"}
        data-theme-option="dark"
        className={theme === "dark" ? "active" : ""}
        onClick={() => selectTheme("dark")}
      >
        <Moon size={16} />
        <span>{t("theme.dark")}</span>
      </button>
    </div>
  );
}

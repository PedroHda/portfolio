"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/use-i18n";
import Link from "next/link";
import { ArrowLeft, Menu } from "lucide-react";
import { images } from "@/assets";
import { ThemeToggle } from "@/components/theme-toggle";
import { getNavigationItems, getRoutes } from "@/routes";
import { LanguageSwitch } from "@/components/language-switch";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  const { t, locale } = useI18n();
  const routes = getRoutes(locale);
  const navigationItems = getNavigationItems(locale);

  return (
    <header className="site-header">
      <nav className="nav" aria-label={t("navigation.label")}>
        <Link
          className="brand"
          href={compact ? routes.home : routes.sections.home}
          aria-label={compact ? t("navigation.portfolio") : t("navigation.home")}
        >
          <Image
            src={images.logo}
            alt=""
            width={42}
            height={42}
            className="brand-logo"
            priority={!compact}
          />
          <span>Pedro Domiciano</span>
        </Link>

        <div className="nav-actions">
          {compact ? (
            <Link className="project-nav-back" href={routes.sections.projects}>
              <ArrowLeft size={17} aria-hidden="true" />
              <span>{t("navigation.projects")}</span>
            </Link>
          ) : (
            <div className="nav-links">
              {navigationItems.map((item) => (
                <a href={item.href} key={item.href}>
                  {t(item.labelKey)}
                </a>
              ))}
            </div>
          )}

          <LanguageSwitch />
          <ThemeToggle />

          {!compact && (
            <details className="mobile-nav">
              <summary aria-label={t("navigation.openMenu")}>
                <Menu size={22} />
                <span className="sr-only">{t("navigation.menu")}</span>
              </summary>
              <div className="mobile-nav-panel">
                {navigationItems.map((item) => (
                  <a href={item.href} key={item.href}>
                    {t(item.labelKey)}
                  </a>
                ))}
              </div>
            </details>
          )}
        </div>
      </nav>
    </header>
  );
}

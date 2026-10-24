import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Menu } from "lucide-react";
import { images } from "@/assets";
import { ThemeToggle } from "@/components/theme-toggle";
import { navigationItems, routes } from "@/routes";

export function SiteHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Navegação principal">
        <Link
          className="brand"
          href={compact ? routes.home : routes.sections.home}
          aria-label={compact ? "Portfólio de Pedro Domiciano" : "Ir para o início"}
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
              <span>Projetos</span>
            </Link>
          ) : (
            <div className="nav-links">
              {navigationItems.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          )}

          <ThemeToggle />

          {!compact && (
            <details className="mobile-nav">
              <summary aria-label="Abrir menu">
                <Menu size={22} />
                <span className="sr-only">Menu</span>
              </summary>
              <div className="mobile-nav-panel">
                {navigationItems.map((item) => (
                  <a href={item.href} key={item.href}>
                    {item.label}
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

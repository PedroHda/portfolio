"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/use-i18n";
import { ArrowUpRight, BriefcaseBusiness, MapPin, TerminalSquare } from "lucide-react";
import { images } from "@/assets";
import { contact, metrics } from "@/data/profile";
import { getRoutes } from "@/routes";

export function HeroSection() {
  const { t, locale } = useI18n();
  const routes = getRoutes(locale);

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="section-inner hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">{t("home:hero.eyebrow")}</p>
          <h1 id="hero-title">
            {t("home:hero.title")}
          </h1>
          <p className="hero-lead">{t("home:hero.lead")}</p>

          <div className="hero-actions" aria-label={t("home:hero.actions")}>
            <a className="button button-primary" href={routes.sections.projects}>
              <TerminalSquare size={18} />
              {t("actions.viewProjects")}
            </a>
            <a
              className="button button-secondary"
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <ArrowUpRight size={18} />
              LinkedIn
            </a>
          </div>

          <div className="hero-meta" aria-label={t("home:hero.information")}>
            <span>
              <MapPin size={17} />
              {contact.location}
            </span>
            <span>
              <BriefcaseBusiness size={17} />
              {t("home:hero.stack")}
            </span>
          </div>
        </div>

        <div className="hero-visual" aria-label={t("home:hero.visual")}>
          <Image
            src={images.heroBackground}
            alt=""
            fill
            sizes="(max-width: 980px) 100vw, 48vw"
            className="hero-panel-image"
            priority
          />
          <div className="hero-visual-overlay" />
          <div className="status-card status-card-top">
            <span>{t("home:hero.currentStack")}</span>
            <strong>React · .NET · SQL</strong>
          </div>
          <div className="status-card status-card-bottom">
            <span>{t("home:hero.focus")}</span>
            <strong>{t("home:hero.focusValue")}</strong>
          </div>
        </div>
      </div>

      <div className="section-inner metrics-strip">
        {metrics.map((metric) => (
          <div className="metric-item" key={metric.id}>
            <strong>{metric.value}</strong>
            <span>{t(`profile:metrics.${metric.id}`)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

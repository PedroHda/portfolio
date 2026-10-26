"use client";

import Image from "next/image";
import { useI18n } from "@/i18n/use-i18n";
import { CalendarDays } from "lucide-react";
import { translateList } from "@/i18n/content";
import { experiences } from "@/data/profile";

export function ExperienceSection() {
  const { t } = useI18n();

  return (
    <section className="section-band section-muted" id="experiencia">
      <div className="section-inner split-section">
        <div className="section-heading sticky-heading">
          <p className="eyebrow">{t("home:experience.eyebrow")}</p>
          <h2>{t("home:experience.title")}</h2>
        </div>

        <div className="timeline">
          {experiences.map((experience) => (
            <article className="experience-card" key={experience.company}>
              <div className="experience-topline">
                {experience.logo ? (
                  <Image
                    src={experience.logo}
                    alt=""
                    width={58}
                    height={58}
                    className="company-logo"
                  />
                ) : (
                  <span className="company-mark" aria-hidden="true">
                    ME
                  </span>
                )}
                <div>
                  <h3>{experience.company}</h3>
                  <p>{t(`profile:experiences.${experience.id}.context`)}</p>
                </div>
              </div>

              <div className="role-header">
                <strong>{t(`profile:experiences.${experience.id}.role`)}</strong>
                <span>
                  <CalendarDays size={16} />
                  {t(`profile:experiences.${experience.id}.period`)}
                </span>
              </div>

              <ul className="highlight-list">
                {translateList(t, `profile:experiences.${experience.id}.highlights`).map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>

              <div className="tag-row" aria-label={t("home:experience.technologies")}>
                {experience.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

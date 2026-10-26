"use client";

import { Code2, Database, Server, Wrench } from "lucide-react";
import { useI18n } from "@/i18n/use-i18n";
import { translateList } from "@/i18n/content";
import { skillGroups } from "@/data/profile";

const skillIcons = { code: Code2, database: Database, server: Server, wrench: Wrench };

export function SkillsSection() {
  const { t } = useI18n();

  return (
    <section className="section-band" id="skills">
      <div className="section-inner">
        <div className="section-heading wide-heading">
          <p className="eyebrow">{t("home:skills.eyebrow")}</p>
          <h2>{t("home:skills.title")}</h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => {
            const Icon = skillIcons[group.icon];

            return (
              <article className="skill-card" key={group.id}>
                <div className="skill-card-title">
                  <Icon size={22} />
                  <h3>{t(`profile:skills.${group.id}.title`)}</h3>
                </div>
                <div className="skill-list">
                  {translateList(t, `profile:skills.${group.id}.items`).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

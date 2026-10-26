"use client";

import { GraduationCap } from "lucide-react";
import { useI18n } from "@/i18n/use-i18n";
import { education } from "@/data/profile";

export function EducationSection() {
  const { t } = useI18n();

  return (
    <section className="section-band" id="formacao">
      <div className="section-inner">
        <div className="section-heading wide-heading">
          <p className="eyebrow">{t("home:education.eyebrow")}</p>
          <h2>{t("home:education.title")}</h2>
        </div>

        <div className="education-grid">
          {education.map((item) => (
            <article className="education-item" key={item.id}>
              <GraduationCap size={24} />
              <div>
                <h3>{t(`profile:education.${item.id}.title`)}</h3>
                <p>{t(`profile:education.${item.id}.detail`)}</p>
                <span>{t(`profile:education.${item.id}.period`)}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

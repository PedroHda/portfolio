"use client";

import { translateList } from "@/i18n/content";
import { useI18n } from "@/i18n/use-i18n";

export function AboutSection() {
  const { t } = useI18n();

  return (
    <section className="section-band" id="sobre">
      <div className="section-inner split-section">
        <div className="section-heading sticky-heading">
          <p className="eyebrow">{t("home:about.eyebrow")}</p>
          <h2>{t("home:about.title")}</h2>
        </div>

        <div className="content-stack">
          <p className="section-lead">{t("home:about.lead")}</p>
          <p>{t("home:about.body")}</p>

          <div className="profile-summary" aria-label={t("home:about.summary")}>
            {translateList(t, "profile:highlights").map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

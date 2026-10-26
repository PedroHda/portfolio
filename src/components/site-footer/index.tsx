"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/use-i18n";
import { ArrowUpRight, BriefcaseBusiness, Mail, Phone } from "lucide-react";
import { contact } from "@/data/profile";
import { getRoutes } from "@/routes";

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  const { t, locale } = useI18n();
  const routes = getRoutes(locale);

  if (compact) {
    return (
      <footer className="project-footer">
        <p>{t("footer.signature")}</p>
        <Link href={routes.sections.contact}>
          {t("actions.talk")} <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </footer>
    );
  }

  return (
    <footer className="footer" id="contato">
      <div className="section-inner footer-grid">
        <div>
          <p className="eyebrow">{t("footer.label")}</p>
          <h2>{t("footer.title")}</h2>
        </div>

        <div className="contact-list">
          <a href={`mailto:${contact.email}`}>
            <Mail size={18} />
            {contact.email}
          </a>
          <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
            <Phone size={18} />
            {contact.phone}
          </a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">
            <ArrowUpRight size={18} />
            LinkedIn
          </a>
          {contact.fiverr ? (
            <a href={contact.fiverr} target="_blank" rel="noreferrer">
              <BriefcaseBusiness size={18} aria-hidden="true" />
              Fiverr
            </a>
          ) : (
            <span className="contact-placeholder">
              <BriefcaseBusiness size={18} aria-hidden="true" />
              <span>Fiverr</span>
              <span className="contact-placeholder-label">{t("footer.comingSoon")}</span>
            </span>
          )}
        </div>
      </div>

      <p className="copyright">
        {t("footer.copyright", { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
}

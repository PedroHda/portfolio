import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Mail, Phone } from "lucide-react";
import { contact } from "@/data/profile";
import { routes } from "@/routes";

export function SiteFooter({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <footer className="project-footer">
        <p>Pedro Domiciano · Desenvolvedor Fullstack</p>
        <Link href={routes.sections.contact}>
          Vamos conversar <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </footer>
    );
  }

  return (
    <footer className="footer" id="contato">
      <div className="section-inner footer-grid">
        <div>
          <p className="eyebrow">Contato</p>
          <h2>Vamos conversar sobre produto, APIs e automação.</h2>
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
              <span className="contact-placeholder-label">Coming soon</span>
            </span>
          )}
        </div>
      </div>

      <p className="copyright">
        © {new Date().getFullYear()} Pedro Domiciano. Todos os direitos reservados.
      </p>
    </footer>
  );
}

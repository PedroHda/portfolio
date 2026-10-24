import Image from "next/image";
import { ArrowUpRight, BriefcaseBusiness, MapPin, TerminalSquare } from "lucide-react";
import { images } from "@/assets";
import { contact, metrics } from "@/data/profile";
import { routes } from "@/routes";

export function HeroSection() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="section-inner hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Desenvolvedor Fullstack</p>
          <h1 id="hero-title">
            Soluções web, APIs e automação com foco em engenharia.
          </h1>
          <p className="hero-lead">
            Sou Pedro Domiciano. Trabalho com React, TypeScript, C#, .NET e
            bancos SQL para transformar regras de negócio em produtos,
            integrações e ferramentas confiáveis.
          </p>

          <div className="hero-actions" aria-label="Ações principais">
            <a className="button button-primary" href={routes.sections.projects}>
              <TerminalSquare size={18} />
              Ver projetos
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

          <div className="hero-meta" aria-label="Informações rápidas">
            <span>
              <MapPin size={17} />
              {contact.location}
            </span>
            <span>
              <BriefcaseBusiness size={17} />
              .NET, React e APIs
            </span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Resumo visual do perfil">
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
            <span>stack atual</span>
            <strong>React · .NET · SQL</strong>
          </div>
          <div className="status-card status-card-bottom">
            <span>foco</span>
            <strong>APIs, automação e legado</strong>
          </div>
        </div>
      </div>

      <div className="section-inner metrics-strip">
        {metrics.map((metric) => (
          <div className="metric-item" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

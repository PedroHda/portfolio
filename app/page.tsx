import Image from "next/image";
import path from "node:path";
import { existsSync } from "node:fs";
import type { ComponentType } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Code2,
  Database,
  Download,
  GraduationCap,
  Mail,
  Menu,
  MapPin,
  Phone,
  Server,
  TerminalSquare,
  Wrench,
} from "lucide-react";

type Experience = {
  company: string;
  role: string;
  period: string;
  context: string;
  highlights: string[];
  stack: string[];
  logo?: string;
};

type SkillGroup = {
  title: string;
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  items: string[];
};

type Project = {
  title: string;
  type: string;
  status: string;
  description: string;
  tags: string[];
  downloadHref?: string;
};

const contact = {
  email: "pedroh.domic@gmail.com",
  phone: "+55 (12) 98804-8778",
  location: "São José dos Campos, SP",
  linkedin: "https://www.linkedin.com/in/pedro-domiciano-ab2339160/",
};

const navItems = [
  { href: "#sobre", label: "Sobre" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#skills", label: "Skills" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Code2,
    items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "UI/UX"],
  },
  {
    title: "Backend",
    icon: Server,
    items: ["C#", ".NET", ".NET Core", "REST APIs", "Python", "PHP", "VB.NET"],
  },
  {
    title: "Dados",
    icon: Database,
    items: ["SQL Server", "MySQL", "Modelagem", "Regras de negócio"],
  },
  {
    title: "Engenharia e ferramentas",
    icon: Wrench,
    items: ["Windows Forms", "CATIA V5", "API COM+", "Flutter", "Git"],
  },
];

const experiences: Experience[] = [
  {
    company: "Mult-e Engenharia Digital",
    role: "Desenvolvedor .NET JR III",
    period: "dez/2024 - atual",
    context: "Tecnologia, engenharia digital e soluções para clientes corporativos.",
    highlights: [
      "Atuação alocada na Embraer com o time KBE, desenvolvendo ferramentas de automação e apoio à engenharia.",
      "Criação e manutenção de soluções em Windows Forms, CATIA V5 e integrações via API COM+.",
      "Desenvolvimento de APIs REST escaláveis, análise de softwares legados e extração de regras de negócio no time MultMercado.",
      "Participação na migração, testes, validação e atualização de mais de 150 ferramentas para uma nova versão do CATIA.",
    ],
    stack: ["C#", ".NET", "Python", "PHP", "Flutter", "CATIA V5", "COM+"],
  },
  {
    company: "2RP Net",
    role: "Desenvolvedor Fullstack JR, Trainee e Estagiário",
    period: "ago/2021 - jan/2024",
    context: "Empresa de tecnologia com produtos web e plataforma antifraude.",
    highlights: [
      "Relacionamento com clientes, avaliação de bugs, solicitações e evolução contínua do produto.",
      "Desenvolvimento de soluções front-end e back-end com foco em experiência do usuário e qualidade de funcionalidades.",
      "Planejamento e implementação de novas telas para a plataforma, incluindo melhorias de UI/UX.",
      "Correção de bugs e desenvolvimento front-end em uma plataforma antifraude.",
    ],
    stack: ["React", "TypeScript", "C#", "SQL Server", "JavaScript"],
    logo: "/images/2rp-net-squareLogo-1635959877878.png",
  },
];

const markdownReaderPath = "/downloads/leitor-markdown.exe";
const markdownReaderExists = existsSync(
  path.join(process.cwd(), "public", "downloads", "leitor-markdown.exe"),
);

const projects: Project[] = [
  {
    title: "Leitor de Markdown para Windows",
    type: "Aplicativo desktop",
    status: markdownReaderExists ? "Download disponível" : "Download em breve",
    description:
      "Projeto em formato executável para abrir e visualizar arquivos Markdown no Windows, pensado para leitura local rápida e simples.",
    tags: ["Windows", "Markdown", ".exe", "Desktop"],
    downloadHref: markdownReaderExists ? markdownReaderPath : undefined,
  },
];

const highlights = [
  "Desenvolvedor Fullstack",
  "REST APIs e integrações",
  "Automação para engenharia",
  "React, TypeScript e .NET",
];

const education = [
  {
    title: "Engenharia da Computação",
    detail: "UNIVAP",
    period: "Conclusão prevista: junho de 2026",
  },
  {
    title: "Inglês",
    detail: "Intermediário",
    period: "Comunicação técnica e leitura de documentação",
  },
];

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label="Navegação principal">
          <a className="brand" href="#inicio" aria-label="Ir para o início">
            <Image
              src="/images/logo.png"
              alt=""
              width={44}
              height={44}
              className="brand-logo"
              priority
            />
            <span>Pedro Domiciano</span>
          </a>

          <div className="nav-links">
            {navItems.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <details className="mobile-nav">
            <summary aria-label="Abrir menu">
              <Menu size={22} />
              <span className="sr-only">Menu</span>
            </summary>
            <div className="mobile-nav-panel">
              {navItems.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </div>
          </details>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <Image
            src="/images/hero-tech-background.webp"
            alt=""
            fill
            sizes="100vw"
            className="hero-image"
            priority
          />
          <div className="hero-scrim" />

          <div className="hero-content">
            <p className="eyebrow">Desenvolvedor Fullstack</p>
            <h1 id="hero-title">Pedro Domiciano</h1>
            <p className="hero-lead">
              Construo soluções web, APIs REST e ferramentas de automação com
              React, TypeScript, C# e .NET para ambientes de engenharia e
              produtos digitais.
            </p>

            <div className="hero-actions" aria-label="Ações principais">
              <a className="button button-primary" href="#projetos">
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
        </section>

        <section className="section-band section-light" id="sobre">
          <div className="section-inner about-grid">
            <div>
              <p className="eyebrow">Sobre mim</p>
              <h2>Fullstack com base forte em produto, backend e automação.</h2>
              <p className="section-lead">
                Minha trajetória começou com Python, HTML e CSS em 2019 e
                evoluiu para projetos profissionais com C#, .NET, React,
                TypeScript e bancos SQL. Tenho vivência em times
                multifuncionais, atendimento de demandas de cliente, correção de
                bugs, evolução de plataformas web e modernização de ferramentas
                legadas.
              </p>
              <p>
                Nos últimos projetos, tenho trabalhado com APIs REST, extração
                de regras de negócio e automações para engenharia, incluindo
                integrações com CATIA V5 e apoio ao time KBE na Embraer.
              </p>
            </div>

            <div className="profile-summary" aria-label="Resumo do perfil">
              {highlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band" id="experiencia">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Experiência</p>
              <h2>Onde tenho criado e sustentado soluções.</h2>
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
                      <p>{experience.context}</p>
                    </div>
                  </div>

                  <div className="role-header">
                    <strong>{experience.role}</strong>
                    <span>
                      <CalendarDays size={16} />
                      {experience.period}
                    </span>
                  </div>

                  <ul className="highlight-list">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>

                  <div className="tag-row" aria-label="Tecnologias usadas">
                    {experience.stack.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band section-light" id="skills">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Skills</p>
              <h2>Tecnologias alinhadas ao currículo.</h2>
            </div>

            <div className="skills-grid">
              {skillGroups.map((group) => {
                const Icon = group.icon;

                return (
                  <article className="skill-card" key={group.title}>
                    <div className="skill-card-title">
                      <Icon size={22} />
                      <h3>{group.title}</h3>
                    </div>
                    <div className="skill-list">
                      {group.items.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-band" id="projetos">
          <div className="section-inner">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Projetos</p>
                <h2>Projetos em destaque.</h2>
              </div>
              <p>
                Soluções desktop e web com foco em utilidade prática,
                automação e leitura local de arquivos.
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.title}>
                  <div className="project-meta">
                    <span>{project.type}</span>
                    <strong>{project.status}</strong>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="tag-row" aria-label="Tecnologias do projeto">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  {project.downloadHref ? (
                    <a
                      className="button button-primary project-action"
                      href={project.downloadHref}
                      download
                    >
                      <Download size={18} />
                      Baixar .exe
                    </a>
                  ) : (
                    <span
                      className="button button-disabled project-action"
                      aria-disabled="true"
                    >
                      <Download size={18} />
                      Download em breve
                    </span>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-band section-light" id="formacao">
          <div className="section-inner">
            <div className="section-heading">
              <p className="eyebrow">Formação</p>
              <h2>Base acadêmica e idiomas.</h2>
            </div>

            <div className="education-grid">
              {education.map((item) => (
                <article className="education-item" key={item.title}>
                  <GraduationCap size={24} />
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                    <span>{item.period}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

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
            <a href="tel:+5512988048778">
              <Phone size={18} />
              {contact.phone}
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">
              <ArrowUpRight size={18} />
              LinkedIn
            </a>
          </div>
        </div>

        <p className="copyright">
          © {currentYear} Pedro Domiciano. Todos os direitos reservados.
        </p>
      </footer>
    </>
  );
}

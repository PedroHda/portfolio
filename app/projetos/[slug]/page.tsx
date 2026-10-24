import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Download, FileText } from "lucide-react";
import { ProjectIcon } from "../../components/ProjectIcon";
import { ThemeToggle } from "../../components/ThemeToggle";
import { getProject, projects, readmeUrl, repositoryUrl } from "../../data/projects";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return {
    title: `${project.title} | Pedro Domiciano`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Pedro Domiciano`,
      description: project.description,
      locale: "pt_BR",
      type: "website",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label="Navegação principal">
          <Link className="brand" href="/" aria-label="Portfólio de Pedro Domiciano">
            <Image src="/images/logo.png" alt="" width={42} height={42} className="brand-logo" />
            <span>Pedro Domiciano</span>
          </Link>
          <div className="nav-actions">
            <Link className="project-nav-back" href="/#projetos">
              <ArrowLeft size={17} aria-hidden="true" />
              <span>Projetos</span>
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>

      <main className={`project-page project-${project.slug}`} id="conteudo">
        <div className="section-inner">
          <Link className="back-link" href="/#projetos">
            <ArrowLeft size={17} aria-hidden="true" /> Voltar aos projetos
          </Link>

          <div className="project-detail-header">
            <span className="project-icon project-icon-large">
              <ProjectIcon slug={project.slug} size={32} />
            </span>
            <p className="eyebrow">{project.type}</p>
            <h1>{project.title}</h1>
            <p className="project-detail-lead">{project.description}</p>
            <div className="tag-row" aria-label="Tecnologias do projeto">
              {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>

          <div className="project-detail-layout">
            <div className="project-detail-content">
              <section className="project-detail-section" aria-labelledby="overview-title">
                <h2 id="overview-title">O projeto em um minuto</h2>
                <p>{project.overview}</p>
              </section>

              <section className="project-detail-section" aria-labelledby="features-title">
                <h2 id="features-title">O que ele faz</h2>
                <ul className="project-feature-list">
                  {project.features.map((feature) => (
                    <li key={feature}>
                      <Check size={18} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {project.preview && (
                <figure className="project-preview">
                  <div className="project-preview-frame">
                    <Image
                      src={project.preview.src}
                      alt={project.preview.alt}
                      width={project.preview.width}
                      height={project.preview.height}
                      sizes="(max-width: 900px) 100vw, 740px"
                    />
                  </div>
                  <figcaption>{project.preview.caption}</figcaption>
                </figure>
              )}

              <section className="project-detail-section" aria-labelledby="status-title">
                <h2 id="status-title">Estado atual</h2>
                <p>{project.notes}</p>
              </section>
            </div>

            <aside className="project-sidebar" aria-label="Links e download do projeto">
              {project.download && (
                <section className="project-download-panel" aria-labelledby="download-title">
                  <span className="download-panel-icon"><Download size={22} aria-hidden="true" /></span>
                  <h2 id="download-title">Experimente no Android</h2>
                  <p>{project.download.requirements}</p>
                  <dl className="download-info">
                    <div><dt>Versão</dt><dd>{project.download.version}</dd></div>
                    <div><dt>Download</dt><dd>{project.download.size} · APK</dd></div>
                  </dl>
                  <a
                    className="button button-primary"
                    href={project.download.href}
                    download={project.download.filename}
                    aria-label={`Baixar APK de ${project.title}`}
                  >
                    <Download size={18} aria-hidden="true" /> Baixar APK
                  </a>
                  <p className="download-note">{project.download.note}</p>
                  <details className="install-guide">
                    <summary>Como instalar o APK</summary>
                    <ol>
                      <li>Baixe o arquivo no celular Android.</li>
                      <li>Abra o APK na pasta Downloads.</li>
                      <li>Se solicitado, autorize a instalação para o navegador ou gerenciador de arquivos usado.</li>
                      <li>Conclua a instalação e abra o aplicativo.</li>
                    </ol>
                  </details>
                </section>
              )}

              <section className="project-source-panel" aria-labelledby="source-title">
                <h2 id="source-title">Explore o projeto</h2>
                <span className="project-status">{project.status}</span>
                <a className="button button-secondary" href={repositoryUrl(project)} target="_blank" rel="noreferrer">
                  <ArrowUpRight size={18} aria-hidden="true" /> Ver no GitHub
                </a>
                {project.readmeAvailable && (
                  <>
                    <a className="readme-link" href={readmeUrl(project)} target="_blank" rel="noreferrer">
                      <FileText size={17} aria-hidden="true" /> Ler README completo
                    </a>
                    <p>Resumo baseado no README. Encontre instruções de uso, configuração e detalhes técnicos no repositório.</p>
                  </>
                )}
              </section>
            </aside>
          </div>

          <nav className="project-pagination" aria-label="Mais projetos">
            <Link href="/#projetos"><ArrowLeft size={18} aria-hidden="true" /> Todos os projetos</Link>
            <Link href={`/projetos/${nextProject.slug}`}>
              <span><small>Próximo projeto</small>{nextProject.title}</span>
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </main>
      <footer className="project-footer">
        <p>Pedro Domiciano · Desenvolvedor Fullstack</p>
        <Link href="/#contato">Vamos conversar <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </footer>
    </>
  );
}

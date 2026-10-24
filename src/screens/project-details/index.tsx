import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ProjectIcon } from "@/components/project-icon";
import { SiteLayout } from "@/layouts/site-layout";
import { routes } from "@/routes";
import type { Project } from "@/types/project";
import { ProjectSidebar } from "./components/project-sidebar";

type ProjectDetailsPageProps = { project: Project; nextProject: Project };

export function ProjectDetailsPage({
  project,
  nextProject,
}: ProjectDetailsPageProps) {
  return (
    <SiteLayout variant="project">
      <main className={`project-page project-${project.slug}`} id="conteudo">
        <div className="section-inner">
          <Link className="back-link" href={routes.sections.projects}>
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

            <ProjectSidebar project={project} />
          </div>

          <nav className="project-pagination" aria-label="Mais projetos">
            <Link href={routes.sections.projects}><ArrowLeft size={18} aria-hidden="true" /> Todos os projetos</Link>
            <Link href={routes.projectDetails(nextProject.slug)}>
              <span><small>Próximo projeto</small>{nextProject.title}</span>
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </main>
    </SiteLayout>
  );
}

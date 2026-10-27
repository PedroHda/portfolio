"use client";

import Image from "next/image";
import { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { ProjectIcon } from "@/components/project-icon";
import { SiteLayout } from "@/layouts/site-layout";
import { getRoutes } from "@/routes";
import type { ProjectDefinition } from "@/types/project";
import { localizeProject } from "@/i18n/content";
import { useI18n } from "@/i18n/use-i18n";
import { ProjectSidebar } from "./components/project-sidebar";
import { useProjectApk } from "@/components/apk-downloads";

type ProjectDetailsPageProps = { project: ProjectDefinition; nextProject: ProjectDefinition };

export function ProjectDetailsPage({
  project,
  nextProject,
}: ProjectDetailsPageProps) {
  const apkProjects = useMemo(() => [project], [project]);
  return (
    <SiteLayout variant="project" apkProjects={apkProjects}>
      <ProjectDetailsContent project={project} nextProject={nextProject} />
    </SiteLayout>
  );
}

function ProjectDetailsContent({
  project: definition,
  nextProject,
}: ProjectDetailsPageProps) {
  const { t, locale } = useI18n();
  const { state } = useProjectApk(definition);
  const project = localizeProject(definition, t, locale, state);
  const routes = getRoutes(locale);
  return (
    <main className={`project-page project-${project.slug}`} id="conteudo">
      <div className="section-inner">
        <Link className="back-link" href={routes.sections.projects}>
          <ArrowLeft size={17} aria-hidden="true" /> {t("actions.backToProjects")}
        </Link>

        <div className="project-detail-header">
          <span className="project-icon project-icon-large">
            <ProjectIcon slug={project.slug} size={32} />
          </span>
          <p className="eyebrow">{project.type}</p>
          <h1>{project.title}</h1>
          <p className="project-detail-lead">{project.description}</p>
          <div className="tag-row" aria-label={t("projects.technologies")}>
            {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>

        <div className="project-detail-layout">
          <div className="project-detail-content">
            <section className="project-detail-section" aria-labelledby="overview-title">
              <h2 id="overview-title">{t("projects.overview")}</h2>
              <p>{project.overview}</p>
            </section>

            <section className="project-detail-section" aria-labelledby="features-title">
              <h2 id="features-title">{t("projects.features")}</h2>
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
              <h2 id="status-title">{t("projects.status")}</h2>
              <p>{project.notes}</p>
            </section>
          </div>

          <ProjectSidebar project={project} />
        </div>

        <nav className="project-pagination" aria-label={t("projects.more")}>
          <Link href={routes.sections.projects}><ArrowLeft size={18} aria-hidden="true" /> {t("actions.allProjects")}</Link>
          <Link href={routes.projectDetails(nextProject.slug)}>
            <span><small>{t("actions.nextProject")}</small>{nextProject.title}</span>
            <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </main>
  );
}

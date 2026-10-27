"use client";

import Link from "next/link";
import { useI18n } from "@/i18n/use-i18n";
import { ArrowUpRight } from "lucide-react";
import { ApkDownloadButton } from "@/components/apk-download-button";
import { ProjectIcon } from "@/components/project-icon";
import { getRoutes } from "@/routes";
import type { Project } from "@/types/project";

export function ProjectCard({ project }: { project: Project }) {
  const { t, locale } = useI18n();
  const routes = getRoutes(locale);

  return (
    <article className={`project-card project-${project.slug}`}>
      <div className="project-card-heading">
        <span className="project-icon">
          <ProjectIcon slug={project.slug} />
        </span>
        <span className={`project-status${project.download || project.apkSource?.directDownloadHref ? " has-download" : ""}`}>
          {project.status}
        </span>
      </div>
      <p className="project-type">{project.type}</p>
      <h3>
        <Link href={routes.projectDetails(project.slug)}>{project.title}</Link>
      </h3>
      <p className="project-description">{project.description}</p>

      <div className="tag-row" aria-label={t("projects.technologiesFor", { title: project.title })}>
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="project-actions">
        <Link
          className="project-details-link"
          href={routes.projectDetails(project.slug)}
          aria-label={t("actions.viewProject", { title: project.title })}
        >
          {t("actions.viewDetails")} <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
        {project.apkSource && <ApkDownloadButton project={project} compact />}
      </div>
    </article>
  );
}

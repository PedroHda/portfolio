import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { ProjectIcon } from "@/components/project-icon";
import { routes } from "@/routes";
import type { Project } from "@/types/project";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card project-${project.slug}`}>
      <div className="project-card-heading">
        <span className="project-icon">
          <ProjectIcon slug={project.slug} />
        </span>
        <span className={`project-status${project.download ? " has-download" : ""}`}>
          {project.status}
        </span>
      </div>
      <p className="project-type">{project.type}</p>
      <h3>
        <Link href={routes.projectDetails(project.slug)}>{project.title}</Link>
      </h3>
      <p className="project-description">{project.description}</p>

      <div className="tag-row" aria-label={`Tecnologias de ${project.title}`}>
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="project-actions">
        <Link
          className="project-details-link"
          href={routes.projectDetails(project.slug)}
          aria-label={`Ver detalhes de ${project.title}`}
        >
          Ver detalhes <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
        {project.download && (
          <a
            className="project-download-link"
            href={project.download.href}
            download={project.download.filename}
            aria-label={`Baixar APK de ${project.title}`}
          >
            <Download size={16} aria-hidden="true" /> Baixar APK
          </a>
        )}
      </div>
    </article>
  );
}

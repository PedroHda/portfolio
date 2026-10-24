"use client";

import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { useState } from "react";
import { projects, type ProjectCategory } from "../data/projects";
import { ProjectIcon } from "./ProjectIcon";

type Filter = "Todos" | ProjectCategory | "Com APK";
const filters: Filter[] = ["Todos", "Aplicativos", "Jogos", "Sites", "Com APK"];

function matchesFilter(project: (typeof projects)[number], filter: Filter) {
  if (filter === "Todos") return true;
  if (filter === "Com APK") return Boolean(project.download);
  return project.category === filter;
}

export function Projects() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Todos");
  const visibleProjects = projects.filter((project) =>
    matchesFilter(project, activeFilter),
  );

  return (
    <>
      <div className="project-filters" role="group" aria-label="Filtrar projetos">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className="project-filter"
            aria-pressed={activeFilter === filter}
            aria-controls="project-results"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
            <span>{projects.filter((project) => matchesFilter(project, filter)).length}</span>
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        {visibleProjects.length} projetos exibidos. Filtro: {activeFilter}.
      </p>

      <div className="projects-grid" id="project-results">
        {visibleProjects.map((project) => (
          <article className={`project-card project-${project.slug}`} key={project.slug}>
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
              <Link href={`/projetos/${project.slug}`}>{project.title}</Link>
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
                href={`/projetos/${project.slug}`}
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
        ))}
      </div>
    </>
  );
}

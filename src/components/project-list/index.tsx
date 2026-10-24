"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types/project";
import { ProjectCard } from "@/components/project-card";

type Filter = "Todos" | ProjectCategory | "Com APK";
const filters: Filter[] = ["Todos", "Aplicativos", "Jogos", "Sites", "Com APK"];

function matchesFilter(project: Project, filter: Filter) {
  if (filter === "Todos") return true;
  if (filter === "Com APK") return Boolean(project.download);
  return project.category === filter;
}

export function ProjectList() {
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
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}

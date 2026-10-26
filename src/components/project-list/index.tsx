"use client";

import { useState } from "react";
import { projects as definitions } from "@/data/projects";
import type { ProjectDefinition, ProjectCategory } from "@/types/project";
import { ProjectCard } from "@/components/project-card";
import { localizeProject } from "@/i18n/content";
import { useI18n } from "@/i18n/use-i18n";

type Filter = "all" | ProjectCategory | "apk";
const filters: Filter[] = ["all", "apps", "games", "websites", "apk"];

function matchesFilter(project: ProjectDefinition, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "apk") return Boolean(project.download);
  return project.category === filter;
}

export function ProjectList() {
  const { t, locale } = useI18n();
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const visibleProjects = definitions
    .filter((project) => matchesFilter(project, activeFilter))
    .map((project) => localizeProject(project, t, locale));

  return (
    <>
      <div className="project-filters" role="group" aria-label={t("filters.label")}>
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            className="project-filter"
            aria-pressed={activeFilter === filter}
            aria-controls="project-results"
            onClick={() => setActiveFilter(filter)}
          >
            {t(`filters.${filter}`)}
            <span>{definitions.filter((project) => matchesFilter(project, filter)).length}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {t("filters.results", { count: visibleProjects.length, filter: t(`filters.${activeFilter}`) })}
      </p>
      <div className="projects-grid" id="project-results">
        {visibleProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
    </>
  );
}

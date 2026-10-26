"use client";

import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n/use-i18n";
import { ProjectList } from "@/components/project-list";
import { githubProfile } from "@/data/projects";

export function ProjectsSection() {
  const { t } = useI18n();

  return (
    <section className="section-band section-muted" id="projetos">
      <div className="section-inner">
        <div className="projects-heading">
          <div className="section-heading">
            <p className="eyebrow">{t("home:projects.eyebrow")}</p>
            <h2>{t("home:projects.title")}</h2>
            <p>{t("home:projects.lead")}</p>
          </div>
          <a className="projects-github-link" href={githubProfile} target="_blank" rel="noreferrer">
            {t("actions.myGithub")} <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <ProjectList />
      </div>
    </section>
  );
}

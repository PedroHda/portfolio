"use client";

import { ArrowUpRight, Download, FileText } from "lucide-react";
import { useI18n } from "@/i18n/use-i18n";
import { readmeUrl, repositoryUrl } from "@/data/projects";
import { translateList } from "@/i18n/content";
import type { Project } from "@/types/project";

export function ProjectSidebar({ project }: { project: Project }) {
  const { t } = useI18n();

  return (
    <aside className="project-sidebar" aria-label={t("projects.links")}>
      {project.download && (
        <section className="project-download-panel" aria-labelledby="download-title">
          <span className="download-panel-icon"><Download size={22} aria-hidden="true" /></span>
          <h2 id="download-title">{t("download.title")}</h2>
          <p>{project.download.requirements}</p>
          <dl className="download-info">
            <div><dt>{t("download.version")}</dt><dd>{project.download.displayVersion}</dd></div>
            <div><dt>{t("download.file")}</dt><dd>{project.download.size} · APK</dd></div>
          </dl>
          <a
            className="button button-primary"
            href={project.download.href}
            download={project.download.filename}
            aria-label={t("actions.downloadProject", { title: project.title })}
          >
            <Download size={18} aria-hidden="true" /> {t("actions.downloadApk")}
          </a>
          <p className="download-note">{project.download.note}</p>
          <details className="install-guide">
            <summary>{t("download.install")}</summary>
            <ol>{translateList(t, "download.steps").map((step) => <li key={step}>{step}</li>)}</ol>
          </details>
        </section>
      )}

      <section className="project-source-panel" aria-labelledby="source-title">
        <h2 id="source-title">{t("projects.explore")}</h2>
        <span className="project-status">{project.status}</span>
        <a className="button button-secondary" href={repositoryUrl(project)} target="_blank" rel="noreferrer">
          <ArrowUpRight size={18} aria-hidden="true" /> {t("actions.github")}
        </a>
        {project.readmeAvailable && (
          <>
            <a className="readme-link" href={readmeUrl(project)} target="_blank" rel="noreferrer">
              <FileText size={17} aria-hidden="true" /> {t("actions.readReadme")}
            </a>
            <p>{t("projects.readmeNote")}</p>
          </>
        )}
      </section>
    </aside>
  );
}

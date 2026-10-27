"use client";

import { ArrowUpRight, Download, FileText } from "lucide-react";
import { useI18n } from "@/i18n/use-i18n";
import { readmeUrl, repositoryUrl } from "@/data/projects";
import { translateList } from "@/i18n/content";
import type { Project } from "@/types/project";
import { ApkDownloadButton } from "@/components/apk-download-button";
import { useProjectApk } from "@/components/apk-downloads";

export function ProjectSidebar({ project }: { project: Project }) {
  const { t } = useI18n();
  const { state } = useProjectApk(project);
  const downloadKey = `projects:items.${project.slug}.download`;

  return (
    <aside className="project-sidebar" aria-label={t("projects.links")}>
      {project.apkSource && (
        <section className="project-download-panel" aria-labelledby="download-title">
          <span className="download-panel-icon"><Download size={22} aria-hidden="true" /></span>
          <h2 id="download-title">{t("download.title")}</h2>
          <p>{project.download?.requirements ?? t(`${downloadKey}.requirements`)}</p>
          {project.download && <dl className="download-info">
            <div><dt>{t("download.version")}</dt><dd>{project.download.displayVersion}</dd></div>
            <div><dt>{t("download.file")}</dt><dd>{project.download.size} · APK</dd></div>
            <div><dt>{t("download.filename")}</dt><dd>{project.download.filename}</dd></div>
          </dl>}
          {state.status === "missing" && <p className="download-note" role="status">{t("download.notPublished")}</p>}
          <ApkDownloadButton project={project} />
          {project.download && <p className="download-note">{project.download.note}</p>}
          {project.download && <details className="install-guide">
            <summary>{t("download.install")}</summary>
            <ol>{translateList(t, "download.steps").map((step) => <li key={step}>{step}</li>)}</ol>
          </details>}
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

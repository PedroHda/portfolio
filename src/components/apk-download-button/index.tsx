"use client";

import { Download, RefreshCw } from "lucide-react";
import { useProjectApk } from "@/components/apk-downloads";
import { useI18n } from "@/i18n/use-i18n";
import type { ProjectDefinition } from "@/types/project";

export function ApkDownloadButton({ project, compact = false }: { project: ProjectDefinition; compact?: boolean }) {
  const { t } = useI18n();
  const { state, refresh } = useProjectApk(project);
  const className = compact ? "project-download-link" : "button button-primary";

  if (state.status === "missing") return null;
  if (state.status === "ready" && state.file) {
    return (
      // Keep the native link activation so mobile browsers handle the attachment.
      <a className={className} href={state.file.href} download={state.file.filename}
        aria-label={t("actions.downloadProject", { title: project.title })}>
        <Download size={compact ? 16 : 18} aria-hidden="true" /> {t("actions.downloadApk")}
      </a>
    );
  }
  return (
    <span className="apk-download-state" aria-live="polite">
      {state.status === "error" && <span className="download-error">{t("download.error")}</span>}
      <button type="button" className={className} disabled={state.status === "loading"}
        onClick={() => { void refresh().catch(() => {}); }}
        aria-label={t(state.status === "error" ? "download.retryProject" : "download.checkingProject", { title: project.title })}>
        <RefreshCw size={compact ? 16 : 18} aria-hidden="true" />
        {t(state.status === "error" ? "download.retry" : "download.checking")}
      </button>
    </span>
  );
}

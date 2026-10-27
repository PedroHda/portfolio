"use client";

import { useState, type MouseEvent } from "react";
import { Download, RefreshCw } from "lucide-react";
import { useProjectApk } from "@/components/apk-downloads";
import { useI18n } from "@/i18n/use-i18n";
import type { ProjectDefinition } from "@/types/project";

export function ApkDownloadButton({ project, compact = false }: { project: ProjectDefinition; compact?: boolean }) {
  const { t } = useI18n();
  const { state, refresh } = useProjectApk(project);
  const [busy, setBusy] = useState(false);
  const className = compact ? "project-download-link" : "button button-primary";

  async function download(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      // Recheck on every click, including when this page has been open for hours.
      const file = await refresh();
      if (file) window.location.assign(file.href);
    } catch {
      // The shared state displays the translated error and offers a retry.
    } finally {
      setBusy(false);
    }
  }

  if (state.status === "missing") return null;
  if (state.status === "ready" && !busy && state.file) {
    return (
      <a className={className} href={state.file.href} download={state.file.filename}
        onClick={download} aria-label={t("actions.downloadProject", { title: project.title })}>
        <Download size={compact ? 16 : 18} aria-hidden="true" /> {t("actions.downloadApk")}
      </a>
    );
  }
  return (
    <span className="apk-download-state" aria-live="polite">
      {state.status === "error" && <span className="download-error">{t("download.error")}</span>}
      <button type="button" className={className} disabled={state.status === "loading" || busy}
        onClick={() => { void refresh().catch(() => {}); }}
        aria-label={t(state.status === "error" ? "download.retryProject" : "download.checkingProject", { title: project.title })}>
        <RefreshCw size={compact ? 16 : 18} aria-hidden="true" />
        {t(state.status === "error" ? "download.retry" : "download.checking")}
      </button>
    </span>
  );
}

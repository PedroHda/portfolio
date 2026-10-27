import type { TFunction } from "i18next";
import type { Project, ProjectDefinition } from "@/types/project";
import type { Locale } from "./config";
import type { ApkState } from "@/types/apk";

export function translateList(t: TFunction, key: string): string[] {
  const result: unknown = t(key, { returnObjects: true });
  if (!Array.isArray(result) || !result.every((item): item is string => typeof item === "string")) {
    throw new Error(`Expected a translated list at ${key}`);
  }
  return result;
}

export function localizeProject(
  project: ProjectDefinition,
  t: TFunction,
  locale: Locale,
  apkState?: ApkState,
): Project {
  const key = `projects:items.${project.slug}`;
  const apk = apkState?.status === "ready" ? apkState.file : undefined;
  const stateLabels = { loading: "checking", ready: "available", missing: "notPublished", error: "unavailable" };
  return {
    ...project,
    type: t(`${key}.type`),
    status: project.apkSource ? t(`download.${project.apkSource.directDownloadHref ? "available" : stateLabels[apkState?.status ?? "loading"]}`) : t(`${key}.status`),
    description: t(`${key}.description`),
    overview: t(`${key}.overview`),
    features: translateList(t, `${key}.features`),
    notes: t(`${key}.notes`),
    download: apk ? {
      ...apk,
      displayVersion: [
        apk.version ?? t("download.latest"),
        apk.variant && t(`download.variants.${apk.variant}`),
        apk.prerelease && t("download.prerelease"),
      ].filter(Boolean).join(" · "),
      size: t("download.size", {
        size: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(apk.sizeBytes / 1_000_000),
      }),
      requirements: t(`${key}.download.requirements`),
      note: t(`${key}.download.note`),
    } : undefined,
    preview: project.preview ? {
      ...project.preview,
      alt: t(`${key}.preview.alt`),
      caption: t(`${key}.preview.caption`),
    } : undefined,
  };
}

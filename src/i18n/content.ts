import type { TFunction } from "i18next";
import type { Project, ProjectDefinition } from "@/types/project";
import type { Locale } from "./config";

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
): Project {
  const key = `projects:items.${project.slug}`;
  return {
    ...project,
    type: t(`${key}.type`),
    status: t(`${key}.status`),
    description: t(`${key}.description`),
    overview: t(`${key}.overview`),
    features: translateList(t, `${key}.features`),
    notes: t(`${key}.notes`),
    download: project.download ? {
      ...project.download,
      displayVersion: [
        project.download.version,
        project.download.variant && t(`download.variants.${project.download.variant}`),
      ].filter(Boolean).join(" · "),
      size: t("download.size", {
        size: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(project.download.sizeMB),
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

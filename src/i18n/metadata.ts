import type { Metadata } from "next";
import { localeDefinitions, type Locale } from "./config";
import { getTranslations } from "./server";
import { localizeProject } from "./content";
import type { ProjectDefinition } from "@/types/project";

export async function getHomeMetadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations(locale);
  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      locale: localeDefinitions[locale].openGraphLocale,
      type: "website",
    },
  };
}

export async function getProjectMetadata(definition: ProjectDefinition, locale: Locale): Promise<Metadata> {
  const t = await getTranslations(locale);
  const project = localizeProject(definition, t, locale);
  return {
    title: `${project.title} | Pedro Domiciano`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Pedro Domiciano`,
      description: project.description,
      locale: localeDefinitions[locale].openGraphLocale,
      type: "website",
    },
  };
}

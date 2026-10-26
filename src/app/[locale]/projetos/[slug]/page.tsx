import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { ProjectDetailsPage } from "@/screens/project-details";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getProjectMetadata } from "@/i18n/metadata";

type ProjectPageProps = { params: Promise<{ locale: string; slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => projects.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || locale === defaultLocale || !project) notFound();
  return getProjectMetadata(project, locale);
}

export default async function LocalizedProjectRoute({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || locale === defaultLocale || !project) notFound();
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  return <ProjectDetailsPage project={project} nextProject={nextProject} />;
}

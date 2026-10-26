import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { ProjectDetailsPage } from "@/screens/project-details";
import { defaultLocale } from "@/i18n/config";
import { getProjectMetadata } from "@/i18n/metadata";

type ProjectPageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => projects.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return getProjectMetadata(project, defaultLocale);
}

export default async function ProjectRoute({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  return <ProjectDetailsPage project={project} nextProject={nextProject} />;
}

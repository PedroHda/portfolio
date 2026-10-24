import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { ProjectDetailsPage } from "@/screens/project-details";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return {
    title: `${project.title} | Pedro Domiciano`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Pedro Domiciano`,
      description: project.description,
      locale: "pt_BR",
      type: "website",
    },
  };
}

export default async function ProjectRoute({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];

  return <ProjectDetailsPage project={project} nextProject={nextProject} />;
}

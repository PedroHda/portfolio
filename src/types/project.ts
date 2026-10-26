import type { StaticImageData } from "next/image";

export type ProjectCategory = "apps" | "games" | "websites";

export type ProjectDefinition = {
  slug: string;
  title: string;
  repository: string;
  category: ProjectCategory;
  tags: string[];
  readmeAvailable: boolean;
  download?: {
    href: string;
    filename: string;
    version: string;
    sizeMB: number;
    variant?: "test" | "demo";
  };
  preview?: { src: StaticImageData; width: number; height: number };
};

export type Project = Omit<ProjectDefinition, "download" | "preview"> & {
  type: string;
  status: string;
  description: string;
  overview: string;
  features: string[];
  notes: string;
  download?: NonNullable<ProjectDefinition["download"]> & {
    displayVersion: string;
    size: string;
    requirements: string;
    note: string;
  };
  preview?: NonNullable<ProjectDefinition["preview"]> & { alt: string; caption: string };
};

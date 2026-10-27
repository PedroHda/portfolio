import type { StaticImageData } from "next/image";
import type { ApkFile, ApkSource } from "./apk";

export type ProjectCategory = "apps" | "games" | "websites";

export type ProjectDefinition = {
  slug: string;
  title: string;
  repository: string;
  category: ProjectCategory;
  tags: string[];
  readmeAvailable: boolean;
  apkSource?: ApkSource;
  preview?: { src: StaticImageData; width: number; height: number };
};

export type Project = Omit<ProjectDefinition, "preview"> & {
  type: string;
  status: string;
  description: string;
  overview: string;
  features: string[];
  notes: string;
  download?: ApkFile & {
    displayVersion: string;
    size: string;
    requirements: string;
    note: string;
  };
  preview?: NonNullable<ProjectDefinition["preview"]> & { alt: string; caption: string };
};

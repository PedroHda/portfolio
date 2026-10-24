import type { StaticImageData } from "next/image";

export type ProjectCategory = "Aplicativos" | "Jogos" | "Sites";

export type Project = {
  slug: string;
  title: string;
  repository: string;
  category: ProjectCategory;
  type: string;
  status: string;
  description: string;
  overview: string;
  tags: string[];
  features: string[];
  notes: string;
  readmeAvailable: boolean;
  download?: {
    href: string;
    filename: string;
    version: string;
    size: string;
    requirements: string;
    note: string;
  };
  preview?: {
    src: StaticImageData;
    alt: string;
    caption: string;
    width: number;
    height: number;
  };
};

import type { StaticImageData } from "next/image";

export type Experience = {
  company: string;
  role: string;
  period: string;
  context: string;
  highlights: string[];
  stack: string[];
  logo?: StaticImageData;
};

export type SkillGroup = {
  title: string;
  icon: "code" | "server" | "database" | "wrench";
  items: string[];
};

import type { StaticImageData } from "next/image";

export type Experience = {
  id: string;
  company: string;
  stack: string[];
  logo?: StaticImageData;
};

export type SkillGroup = {
  id: string;
  icon: "code" | "server" | "database" | "wrench";
};

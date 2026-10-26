import ptCommon from "./locales/pt-BR/common.json";
import ptHome from "./locales/pt-BR/home.json";
import ptProfile from "./locales/pt-BR/profile.json";
import ptProjects from "./locales/pt-BR/projects.json";
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enProfile from "./locales/en/profile.json";
import enProjects from "./locales/en/projects.json";
import type { Locale } from "./config";

const ptBR = {
  common: ptCommon,
  home: ptHome,
  profile: ptProfile,
  projects: ptProjects,
};

export type LocaleMessages = typeof ptBR;

// Adding a locale requires all namespaces and the same translation structure.
export const resources = {
  "pt-BR": ptBR,
  en: {
    common: enCommon,
    home: enHome,
    profile: enProfile,
    projects: enProjects,
  },
} satisfies Record<Locale, LocaleMessages>;

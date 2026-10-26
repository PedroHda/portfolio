import { defaultLocale, localizePath, type Locale } from "@/i18n/config";

export function getRoutes(locale: Locale = defaultLocale) {
  const local = (path: string) => localizePath(path, locale);
  return {
    home: local("/"),
    projectDetails: (slug: string) => local(`/projetos/${encodeURIComponent(slug)}`),
    sections: {
      home: local("/#inicio"),
      about: local("/#sobre"),
      experience: local("/#experiencia"),
      skills: local("/#skills"),
      projects: local("/#projetos"),
      contact: local("/#contato"),
    },
  };
}

export function getNavigationItems(locale: Locale) {
  const routes = getRoutes(locale);
  return [
    { href: routes.sections.about, labelKey: "navigation.about" },
    { href: routes.sections.experience, labelKey: "navigation.experience" },
    { href: routes.sections.skills, labelKey: "navigation.skills" },
    { href: routes.sections.projects, labelKey: "navigation.projects" },
    { href: routes.sections.contact, labelKey: "navigation.contact" },
  ];
}

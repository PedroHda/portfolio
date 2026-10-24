export const routes = {
  home: "/",
  projectDetails: (slug: string) => `/projetos/${slug}`,
  sections: {
    home: "/#inicio",
    about: "/#sobre",
    experience: "/#experiencia",
    skills: "/#skills",
    projects: "/#projetos",
    contact: "/#contato",
  },
};

export const navigationItems = [
  { href: routes.sections.about, label: "Sobre" },
  { href: routes.sections.experience, label: "Experiência" },
  { href: routes.sections.skills, label: "Skills" },
  { href: routes.sections.projects, label: "Projetos" },
  { href: routes.sections.contact, label: "Contato" },
];

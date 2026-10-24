import { images } from "@/assets";
import type { Experience, SkillGroup } from "@/types/profile";

export const contact = {
  email: "pedroh.domic@gmail.com",
  phone: "+55 (12) 98804-8778",
  location: "São José dos Campos, SP",
  linkedin: "https://www.linkedin.com/in/pedro-domiciano-ab2339160/",
  // Preencha com o link do seu perfil para ativar o acesso ao Fiverr.
  fiverr: "https://br.fiverr.com/pedrohdomic",
};

export const metrics = [
  { value: "4+", label: "anos criando soluções" },
  { value: "150+", label: "ferramentas CATIA migradas" },
  { value: "2026", label: "Engenharia da Computação" },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: "code",
    items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "UI/UX"],
  },
  {
    title: "Backend",
    icon: "server",
    items: ["C#", ".NET", ".NET Core", "REST APIs", "Python", "PHP", "VB.NET"],
  },
  {
    title: "Dados",
    icon: "database",
    items: ["SQL Server", "MySQL", "Modelagem", "Regras de negócio"],
  },
  {
    title: "Engenharia",
    icon: "wrench",
    items: ["Windows Forms", "CATIA V5", "API COM+", "Flutter", "Git"],
  },
];

export const experiences: Experience[] = [
  {
    company: "Mult-e Engenharia Digital",
    role: "Desenvolvedor .NET JR III",
    period: "dez/2024 - atual",
    context: "Tecnologia, engenharia digital e soluções para clientes corporativos.",
    highlights: [
      "Atuação alocada na Embraer com o time KBE, desenvolvendo ferramentas de automação e apoio à engenharia.",
      "Criação e manutenção de soluções em Windows Forms, CATIA V5 e integrações via API COM+.",
      "Desenvolvimento de APIs REST escaláveis, análise de softwares legados e extração de regras de negócio no time MultMercado.",
      "Participação na migração, testes, validação e atualização de mais de 150 ferramentas para uma nova versão do CATIA.",
    ],
    stack: ["C#", ".NET", "Python", "PHP", "Flutter", "CATIA V5", "COM+"],
  },
  {
    company: "2RP Net",
    role: "Desenvolvedor Fullstack JR, Trainee e Estagiário",
    period: "ago/2021 - jan/2024",
    context: "Empresa de tecnologia com produtos web e plataforma antifraude.",
    highlights: [
      "Relacionamento com clientes, avaliação de bugs, solicitações e evolução contínua do produto.",
      "Desenvolvimento de soluções front-end e back-end com foco em experiência do usuário e qualidade de funcionalidades.",
      "Planejamento e implementação de novas telas para a plataforma, incluindo melhorias de UI/UX.",
      "Correção de bugs e desenvolvimento front-end em uma plataforma antifraude.",
    ],
    stack: ["React", "TypeScript", "C#", "SQL Server", "JavaScript"],
    logo: images.companyLogo,
  },
];

export const highlights = [
  "Desenvolvedor Fullstack",
  "REST APIs e integrações",
  "Automação para engenharia",
  "React, TypeScript e .NET",
];

export const education = [
  {
    title: "Engenharia da Computação",
    detail: "UNIVAP",
    period: "Concluido em 2026",
  },
  {
    title: "Inglês",
    detail: "Intermediário",
    period: "Comunicação técnica e leitura de documentação",
  },
];

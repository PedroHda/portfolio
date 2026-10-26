import { images } from "@/assets";
import type { Experience, SkillGroup } from "@/types/profile";

// URLs e dados de contato são compartilhados por todos os idiomas.
export const contact = {
  "email": "pedroh.domic@gmail.com",
  "phone": "+55 (12) 98804-8778",
  "location": "São José dos Campos, SP",
  "linkedin": "https://www.linkedin.com/in/pedro-domiciano-ab2339160/",
  "fiverr": "https://br.fiverr.com/pedrohdomic"
};

export const metrics = [
  {
    "id": "experience",
    "value": "4+"
  },
  {
    "id": "tools",
    "value": "150+"
  },
  {
    "id": "degree",
    "value": "2026"
  }
];

export const skillGroups: SkillGroup[] = [
  {
    "id": "frontend",
    "icon": "code"
  },
  {
    "id": "backend",
    "icon": "server"
  },
  {
    "id": "data",
    "icon": "database"
  },
  {
    "id": "engineering",
    "icon": "wrench"
  }
];

export const experiences: Experience[] = [
  {
    "id": "mult-e",
    "company": "Mult-e Engenharia Digital",
    "stack": [
      "C#",
      ".NET",
      "Python",
      "PHP",
      "Flutter",
      "CATIA V5",
      "COM+"
    ]
  },
  {
    "id": "2rp",
    "company": "2RP Net",
    "stack": [
      "React",
      "TypeScript",
      "C#",
      "SQL Server",
      "JavaScript"
    ],
    "logo": images.companyLogo
  }
];

export const education = [
  {
    "id": "degree"
  },
  {
    "id": "english"
  }
];

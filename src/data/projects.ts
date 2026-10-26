import { images } from "@/assets";
import type { ProjectDefinition } from "@/types/project";

export const githubProfile = "https://github.com/PedroHda";

export function repositoryUrl(project: Pick<ProjectDefinition, "repository">) {
  return `${githubProfile}/${project.repository}`;
}

export function readmeUrl(project: Pick<ProjectDefinition, "repository">) {
  return `${repositoryUrl(project)}#readme`;
}

export const projects: ProjectDefinition[] = [
  {
    "slug": "mdreader",
    "title": "MDReader",
    "repository": "MDReader",
    "category": "apps",
    "tags": ["C#", ".NET for Android", "Windows Forms", "Markdig"],
    "readmeAvailable": true,
    "download": {
      "href": "https://github.com/PedroHda/MDReader/releases/download/android-v1.0.0/MDReader.apk",
      "filename": "MDReader.apk",
      "version": "1.0.0",
      "sizeMB": 62.631
    }
  },
  {
    "slug": "coloring-game",
    "title": "ColoringGame",
    "repository": "ColoringGame",
    "category": "games",
    "tags": [
      "React",
      "TypeScript",
      "Canvas 2D",
      "React Native",
      "Skia",
      "SQLite"
    ],
    "readmeAvailable": true,
    "preview": {
      "src": images.projects.coloringGame,
      "width": 755,
      "height": 1054
    }
  },
  {
    "slug": "carrinho-de-compras",
    "title": "Carrinho de Compras",
    "repository": "CarrinhoDeCompras",
    "category": "apps",
    "tags": [
      "Flutter",
      "Dart",
      "SQLite",
      "Android"
    ],
    "readmeAvailable": true,
    "download": {
      "href": "https://github.com/PedroHda/CarrinhoDeCompras/releases/download/v1.1.0/carrinho-de-compras-1.1.0-teste.apk",
      "filename": "carrinho-de-compras-1.1.0-teste.apk",
      "version": "1.1.0",
      "sizeMB": 106,
      "variant": "test"
    },
    "preview": {
      "src": images.projects.shoppingCart,
      "width": 430,
      "height": 932
    }
  },
  {
    "slug": "nosso-casamento",
    "title": "Nosso Casamento",
    "repository": "NossoCasamento",
    "category": "apps",
    "tags": [
      "JavaScript",
      "Vite",
      "Capacitor",
      "CSS"
    ],
    "readmeAvailable": true,
    "download": {
      "href": "https://raw.githubusercontent.com/PedroHda/NossoCasamento/master/apk/NossoCasamento-v1.0.0-demo.apk",
      "filename": "NossoCasamento-v1.0.0-demo.apk",
      "version": "1.0.0",
      "sizeMB": 4.4,
      "variant": "demo"
    },
    "preview": {
      "src": images.projects.wedding,
      "width": 1425,
      "height": 1564
    }
  },
  {
    "slug": "projeto-van",
    "title": "Projeto Van",
    "repository": "ProjetoVan",
    "category": "apps",
    "tags": [
      "C#",
      ".NET MAUI",
      "Blazor",
      "SQLite"
    ],
    "readmeAvailable": true,
    "download": {
      "href": "https://raw.githubusercontent.com/PedroHda/ProjetoVan/master/apks/VansEscola.apk",
      "filename": "VansEscola.apk",
      "version": "1.0.4",
      "sizeMB": 39.7
    },
    "preview": {
      "src": images.projects.schoolTransport,
      "width": 1280,
      "height": 800
    }
  },
  {
    "slug": "luiz-fernando-imobiliaria",
    "title": "Luiz Fernando Imobiliária",
    "repository": "LuizFernandoImobiliaria",
    "category": "websites",
    "tags": [
      "React",
      "TypeScript",
      "Vinext",
      "CSS"
    ],
    "readmeAvailable": false
  },
  {
    "slug": "ligia-rosa-atelier",
    "title": "Lígia Rosa Ateliê",
    "repository": "ligiaRosaAtelier",
    "category": "websites",
    "tags": [
      "Next.js",
      "React",
      "TypeScript",
      "CSS Modules"
    ],
    "readmeAvailable": true
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

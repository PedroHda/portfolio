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
    src: string;
    alt: string;
    caption: string;
    width: number;
    height: number;
  };
};

export const githubProfile = "https://github.com/PedroHda";

export function repositoryUrl(project: Project) {
  return `${githubProfile}/${project.repository}`;
}

export function readmeUrl(project: Project) {
  return `${repositoryUrl(project)}#readme`;
}

export const projects: Project[] = [
  {
    slug: "mdreader",
    title: "MDReader",
    repository: "MDReader",
    category: "Aplicativos",
    type: "Desktop · Windows",
    status: "Código disponível",
    description:
      "Leitor de Markdown para Windows com abas para o texto original e a visualização formatada.",
    overview:
      "Um leitor desktop para abrir documentos .md e .markdown sem depender do navegador. Desenvolvido em C# com Windows Forms, usa Markdig para converter o conteúdo em HTML e permite recarregar o arquivo depois de editá-lo em outro programa.",
    tags: ["C#", ".NET 9", "Windows Forms", "Markdig"],
    features: [
      "Abertura de arquivos pelo seletor nativo do Windows.",
      "Abas de texto bruto e visualização com títulos, tabelas, listas e blocos de código.",
      "Recarga manual para acompanhar alterações feitas em outro editor.",
      "Validação de arquivos e script para gerar uma versão portátil para Windows 64 bits.",
    ],
    notes:
      "O MDReader é um leitor, sem edição de documentos. O repositório contém o código e as instruções de compilação; ainda não há executável publicado para download.",
    readmeAvailable: true,
  },
  {
    slug: "coloring-game",
    title: "ColoringGame",
    repository: "ColoringGame",
    category: "Jogos",
    type: "Jogo · Web e Android",
    status: "Android em desenvolvimento",
    description:
      "Colorê: uma jornada de pintura livre pela história, com personagens, roupas e progresso salvo.",
    overview:
      "Colorê — O Caminho das Cores combina pintura livre e exploração histórica. O jogador cria seu viajante, colore ilustrações de diferentes épocas e personaliza as roupas do personagem. A versão web oferece 15 caminhos e 75 ilustrações jogáveis.",
    tags: ["React", "TypeScript", "Canvas 2D", "React Native", "Skia", "SQLite"],
    features: [
      "Pintura por traços contínuos com 12 ferramentas, materiais e cores livres.",
      "Desfazer, refazer e apagar a tinta preservando os contornos do desenho.",
      "Personagem personalizável, roupas pintáveis e progressão por XP.",
      "Coleção de pinturas, salvamento local e backups.",
    ],
    notes:
      "A experiência web está implementada. A versão Android tem renderizador nativo e configuração de build, mas o README informa que ainda não há APK compilado nem teste em aparelho.",
    readmeAvailable: true,
    preview: {
      src: "/images/projects/coloring-game.jpg",
      alt: "Editor de pintura do Colorê com uma ilustração em andamento e ferramentas de cores",
      caption: "Captura da versão web publicada na documentação do projeto.",
      width: 755,
      height: 1054,
    },
  },
  {
    slug: "carrinho-de-compras",
    title: "Carrinho de Compras",
    repository: "CarrinhoDeCompras",
    category: "Aplicativos",
    type: "Aplicativo · Android",
    status: "APK disponível",
    description:
      "Listas de supermercado, leitura de notas fiscais e histórico de compras com dados no celular.",
    overview:
      "Aplicativo em português para planejar as compras do mercado e acompanhar o que foi comprado. As listas ficam separadas dos valores da conferência e do histórico, com armazenamento local em SQLite e uso sem cadastro.",
    tags: ["Flutter", "Dart", "SQLite", "Android"],
    features: [
      "Criação de listas item a item, por texto em lote ou repetindo o mês anterior.",
      "Controle de quantidades, itens no carrinho e exclusão com opção de desfazer.",
      "Consulta de NFC-e de São Paulo por QR code e reconhecimento local de fotos de notas.",
      "Histórico por período, busca por mercado ou produto e backup dos dados.",
    ],
    notes:
      "O APK recomendado no README instala o Carrinho Teste, que pode coexistir com o aplicativo original. Os dados ficam no aparelho; a transferência entre instalações é feita por backup.",
    readmeAvailable: true,
    download: {
      href: "https://github.com/PedroHda/CarrinhoDeCompras/releases/download/v1.1.0/carrinho-de-compras-1.1.0-teste.apk",
      filename: "carrinho-de-compras-1.1.0-teste.apk",
      version: "1.1.0 · Teste",
      size: "106 MB",
      requirements: "Android 7.0 ou superior",
      note: "Instala como Carrinho Teste. É a versão recomendada pelo projeto para testar sem substituir o aplicativo anterior.",
    },
    preview: {
      src: "/images/projects/carrinho-de-compras.png",
      alt: "Tela do Carrinho de Compras com listas de supermercado e progresso dos itens",
      caption: "Interface do aplicativo com dados fictícios, conforme a documentação.",
      width: 430,
      height: 932,
    },
  },
  {
    slug: "nosso-casamento",
    title: "Nosso Casamento",
    repository: "NossoCasamento",
    category: "Aplicativos",
    type: "Aplicativo · Web e Android",
    status: "APK disponível",
    description:
      "Planejamento do casamento com orçamento, convidados, tarefas, fornecedores e contagem regressiva.",
    overview:
      "Um painel responsivo para reunir os detalhes do casamento em um só lugar. A versão Android empacota a experiência web com Capacitor e funciona offline, mantendo os cadastros e a contagem regressiva no dispositivo.",
    tags: ["JavaScript", "Vite", "Capacitor", "CSS"],
    features: [
      "Painel com contagem regressiva, indicadores e gráficos do planejamento.",
      "Orçamento com despesas, pagamentos parciais, saldo e vencimentos.",
      "Convidados com acompanhantes e confirmações, checklist e fornecedores.",
      "Preferências do casal, busca global e exportação/importação de backups JSON.",
    ],
    notes:
      "O planejamento é local, sem login ou sincronização automática entre dispositivos. A demonstração começa com dados fictícios e permite começar do zero. A data de referência do projeto é 24 de julho de 2027.",
    readmeAvailable: true,
    download: {
      href: "https://raw.githubusercontent.com/PedroHda/NossoCasamento/master/apk/NossoCasamento-v1.0.0-demo.apk",
      filename: "NossoCasamento-v1.0.0-demo.apk",
      version: "1.0.0 · Demo",
      size: "4,4 MB",
      requirements: "Android · versão de demonstração",
      note: "Inclui dados de exemplo e funcionamento offline. O guia Android no repositório explica a instalação e o armazenamento.",
    },
    preview: {
      src: "/images/projects/nosso-casamento.jpg",
      alt: "Painel Nosso Casamento com contagem regressiva, orçamento e próximos passos",
      caption: "Visão geral do painel com os dados de demonstração do projeto.",
      width: 1425,
      height: 1564,
    },
  },
  {
    slug: "projeto-van",
    title: "Projeto Van",
    repository: "ProjetoVan",
    category: "Aplicativos",
    type: "Aplicativo · Android",
    status: "APK disponível",
    description:
      "RotaCerta Escolar: organização do transporte escolar com cadastros, indicadores, relatórios e backup.",
    overview:
      "Aplicativo Android para consultar crianças, responsáveis e escolas e acompanhar a operação do transporte escolar. O RotaCerta usa .NET MAUI Blazor Hybrid com interface Razor e banco SQLite local, incluindo relatórios e troca de cópias do banco entre aparelhos.",
    tags: ["C#", ".NET MAUI", "Blazor", "SQLite"],
    features: [
      "Dashboard com indicadores, distribuição por escola e rota e agenda resumida.",
      "Busca, filtros e fichas de crianças, escolas e responsáveis.",
      "Pré-cadastro simplificado e exportação de relatórios Excel.",
      "Download, compartilhamento, comparação e importação do banco local.",
    ],
    notes:
      "Protótipo funcional com dados de demonstração e pré-cadastro simplificado. A agenda ainda não controla presença ou embarques em tempo real. O aplicativo não possui sincronização em nuvem.",
    readmeAvailable: true,
    download: {
      href: "https://raw.githubusercontent.com/PedroHda/ProjetoVan/master/apks/VansEscola.apk",
      filename: "VansEscola.apk",
      version: "1.0.4",
      size: "39,7 MB",
      requirements: "Android 7.0 ou superior",
      note: "O aplicativo aparece como RotaCerta no celular. A primeira abertura carrega uma base de demonstração.",
    },
    preview: {
      src: "/images/projects/projeto-van.png",
      alt: "Dashboard do RotaCerta Escolar com indicadores e distribuição do transporte por escola",
      caption: "Dashboard do protótipo com a base de demonstração.",
      width: 1280,
      height: 800,
    },
  },
  {
    slug: "luiz-fernando-imobiliaria",
    title: "Luiz Fernando Imobiliária",
    repository: "LuizFernandoImobiliaria",
    category: "Sites",
    type: "Site · Catálogo de imóveis",
    status: "Em desenvolvimento",
    description:
      "Portal de imóveis no Vale do Paraíba e Litoral Norte com filtros e atendimento pelo WhatsApp.",
    overview:
      "Site para apresentar imóveis e facilitar o contato com o corretor. O catálogo organiza casas, apartamentos e sobrados por região, com páginas individuais e uma experiência adaptada para computador e celular.",
    tags: ["React", "TypeScript", "Vinext", "CSS"],
    features: [
      "Busca por bairro, cidade ou código do imóvel.",
      "Filtros de cidade, tipo, preço e número de quartos, com ordenação dos resultados.",
      "Páginas de imóveis com fotos, características e destaques.",
      "Contato pelo WhatsApp com mensagem preparada para o imóvel escolhido.",
    ],
    notes:
      "Site em desenvolvimento. O repositório público ainda não contém código ou README; este resumo apresenta os recursos encontrados na versão local do projeto.",
    readmeAvailable: false,
  },
  {
    slug: "ligia-rosa-atelier",
    title: "Lígia Rosa Ateliê",
    repository: "ligiaRosaAtelier",
    category: "Sites",
    type: "Site · Catálogo artesanal",
    status: "Protótipo funcional",
    description:
      "Catálogo de pintura artesanal em tecido com coleções, variações de produtos e pedidos pelo WhatsApp.",
    overview:
      "Catálogo responsivo para valorizar peças artesanais e aproximar o visitante do atendimento. Desenvolvido com Next.js e TypeScript, apresenta coleções e produtos e prepara a mensagem do pedido com as variações escolhidas.",
    tags: ["Next.js", "React", "TypeScript", "CSS Modules"],
    features: [
      "Apresentação de coleções e produtos com fotografias e descrições.",
      "Navegação por categorias e seleção de variações das peças.",
      "Mensagem de pedido preparada automaticamente para o WhatsApp.",
      "Layout responsivo para conhecer o catálogo no celular ou computador.",
    ],
    notes:
      "Protótipo funcional com preços e depoimentos ilustrativos. O atendimento acontece pelo WhatsApp; ainda não há carrinho, pagamento integrado ou backend.",
    readmeAvailable: true,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

# Portfólio Pedro Domiciano

Portfólio em Next.js com TypeScript e exportação estática para o Netlify.

## Rodar localmente

Use Node.js 22 e npm 10:

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`.

## Organização das pastas

O código editável da aplicação fica em `src/`, organizado por responsabilidade:

```text
src/
├── app/                         # Entrada do Next.js: rotas, metadados e documento HTML
│   ├── layout.tsx               # Idioma, tema inicial e importação do CSS global
│   ├── page.tsx                 # Conecta / à HomePage
│   └── projetos/[slug]/page.tsx  # Conecta a URL à tela do projeto
├── assets/
│   ├── images/                  # Logos, fotos e capturas dos projetos
│   └── index.ts                 # Importações das imagens usadas pela aplicação
├── components/                  # Componentes reutilizáveis, uma pasta por componente
│   ├── project-card/
│   ├── project-icon/
│   ├── project-list/
│   ├── site-footer/
│   ├── site-header/
│   └── theme-toggle/
├── data/
│   ├── profile.ts               # Contato, experiência, formação e tecnologias
│   └── projects.ts              # Projetos, resumos, imagens e downloads
├── layouts/
│   └── site-layout/             # Composição de cabeçalho + conteúdo + rodapé
├── routes/
│   └── index.ts                 # Endereços das páginas, seções e itens de navegação
├── screens/                     # Telas completas, como as páginas de um projeto React
│   ├── home/
│   │   ├── index.tsx            # Monta a página inicial
│   │   └── sections/            # Hero, sobre, experiência, skills, projetos e formação
│   └── project-details/
│       ├── index.tsx            # Monta a página de detalhes
│       └── components/          # Componentes exclusivos dessa tela
├── styles/
│   └── globals.css              # Estilos, responsividade e temas
└── types/
    ├── profile.ts               # Tipos dos dados profissionais
    └── project.ts               # Tipos de projeto, APK e imagem
```

### Onde editar

| Quero alterar | Local |
| --- | --- |
| Texto de apresentação ou seção da página inicial | `src/screens/home/sections/` |
| Contato, experiência ou formação | `src/data/profile.ts` |
| Descrição, tecnologias ou APK de um projeto | `src/data/projects.ts` |
| Aparência da página de detalhes | `src/screens/project-details/` |
| Card ou filtro de projetos | `src/components/project-card/` ou `project-list/` |
| Menu ou rodapé | `src/components/site-header/` ou `site-footer/` |
| Endereços e links de navegação | `src/routes/index.ts` |
| Cores, temas e espaçamentos | `src/styles/globals.css` |
| Fotos e logos | `src/assets/images/`, com importações em `src/assets/index.ts` |

Cada componente e tela expõe seu componente em `index.tsx`, permitindo imports
como `@/components/project-card` e `@/screens/home`. O alias `@/` aponta para `src/`.
Componentes exclusivos de uma tela ficam junto dela; componentes compartilhados
ficam em `src/components/`.

O Fiverr aparece no contato como **Coming soon**. Para ativar o link, preencha
`contact.fiverr` em `src/data/profile.ts` com o endereço do seu perfil. Enquanto o
campo estiver vazio, o site exibe apenas o aviso.

### Rotas no Next.js

`src/routes/index.ts` centraliza os endereços usados na interface. O Next.js
reconhece as rotas pelos arquivos `page.tsx` de `src/app/`, que conectam esses
endereços às telas de `src/screens/`. Ao adicionar uma nova página, crie sua tela,
o arquivo de entrada correspondente em `src/app/` e seu endereço em `src/routes/`.

O nome `screens` evita conflito com `pages`, que é reservado ao Pages Router do
Next.js. Esta aplicação continua usando o App Router e exportação estática.

As configurações (`package.json`, `tsconfig.json`, `next.config.ts` e
`netlify.toml`) ficam na raiz. Se necessário, `public/` também fica na raiz para
arquivos que precisem de uma URL fixa. As imagens atuais são importadas de
`src/assets/` e incluídas automaticamente no build.

## Projetos

A seção de projetos apresenta cards curtos com filtros por categoria e por APK
disponível. Cada card abre uma página em `/projetos/[slug]`, com resumo do README,
principais funcionalidades, tecnologias, estado atual e links para o GitHub.

Os sete projetos estão centralizados em `src/data/projects.ts`. Para atualizar um
projeto, edite seu resumo e os links após conferir o README e os arquivos publicados.
As páginas são geradas durante o build, sem depender da API do GitHub em cada visita.

### Downloads diretos

Os botões apontam para o arquivo APK, sem passar pela página do GitHub:

- **Carrinho de Compras:** release 1.1.0, instalador Carrinho Teste recomendado no README.
- **Nosso Casamento:** APK de demonstração 1.0.0 no repositório.
- **Projeto Van / RotaCerta:** `apks/VansEscola.apk` no repositório.

Os arquivos continuam hospedados no GitHub. Não é necessário copiar os APKs para o
portfólio. Para adicionar um download, preencha `download` com a URL direta, nome do
arquivo, versão, tamanho, requisitos e observação. Cadastre somente arquivos
publicados e acessíveis, preferindo a versão recomendada pelo README.

MDReader e ColoringGame ainda não possuem instaladores publicados. O repositório
público de Luiz Fernando Imobiliária está vazio; seu resumo foi baseado no código
local, com essa condição indicada na página. Os demais resumos foram conferidos nos
READMEs públicos em 24/10/2026.

As imagens de demonstração em `src/assets/images/projects/` vêm da documentação dos
próprios projetos.

## Verificar e gerar o site

```bash
npm run typecheck
npm run build
```

O build gera a página inicial e as sete páginas de projeto em `out/`. A configuração
existente em `netlify.toml` publica essa pasta.

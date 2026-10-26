# Portfólio Pedro Domiciano

Portfólio em Next.js com TypeScript, i18next e exportação estática para o Netlify.

## Desenvolvimento

Use Node.js 22 e npm 10:

```bash
npm ci
npm run dev
```

- Português brasileiro: http://localhost:3000/
- Inglês: http://localhost:3000/en

O seletor do cabeçalho mantém a página, os parâmetros da URL e a âncora ao mudar
idioma. Os links internos preservam o idioma escolhido, inclusive após recarregar.
O português é o idioma padrão; os endereços anteriores continuam disponíveis.

## Organização

Todo o código editável da aplicação fica em `src/`:

```text
src/
├── app/
│   ├── (default)/        # Rotas em português: / e /projetos/[slug]
│   └── [locale]/         # Rotas traduzidas: /en e /en/projetos/[slug]
├── assets/images/        # Logos, fotos e capturas dos projetos
├── components/           # Componentes compartilhados, incluindo seletor de idioma
├── data/                 # Identidade, URLs, tecnologias e arquivos para download
├── i18n/
│   ├── config.ts         # Idiomas habilitados, fallback e prefixos de URL
│   ├── resources.ts      # Registro dos catálogos, com validação de estrutura
│   ├── locales/pt-BR/    # Traduções em português brasileiro
│   ├── locales/en/       # Traduções em inglês
│   ├── provider.tsx      # Instância i18next de cada documento
│   ├── use-i18n.ts       # Hook de tradução e idioma atual
│   ├── server.ts         # Tradução no build, com instâncias isoladas
│   ├── content.ts        # Conteúdo e formatos localizados
│   └── metadata.ts       # Títulos e descrições para buscadores
├── layouts/
│   ├── document-layout/  # HTML, idioma, tema inicial, CSS e provider
│   └── site-layout/      # Cabeçalho, conteúdo e rodapé
├── routes/               # Endereços e navegação, considerando o idioma
├── screens/
│   ├── home/             # Página inicial e suas seções
│   └── project-details/  # Detalhes e componentes exclusivos dessa tela
├── styles/globals.css    # Estilos, temas e responsividade
└── types/                # Tipos dos dados profissionais e dos projetos
```

Cada componente e tela expõe seu componente em `index.tsx`. O alias `@/` aponta
para `src/`. O Next.js conecta URLs às telas por arquivos pequenos em `src/app/`.
O nome `screens` evita conflito com o Pages Router reservado do Next.js.
Configurações permanecem na raiz; `public/` pode ser usado para arquivos com URL
fixa. As imagens atuais são importadas de `src/assets/` durante o build.

## Onde editar

| Quero alterar | Local |
| --- | --- |
| Apresentação e textos das seções | `src/i18n/locales/{idioma}/home.json` |
| Experiência, formação, skills e destaques | `src/i18n/locales/{idioma}/profile.json` |
| Descrições, funcionalidades e notas dos projetos | `src/i18n/locales/{idioma}/projects.json` |
| Botões, menu, acessibilidade e rótulos | `src/i18n/locales/{idioma}/common.json` |
| Contato, LinkedIn e Fiverr | `src/data/profile.ts` |
| Repositórios, tecnologias, imagens e APKs | `src/data/projects.ts` |
| Estrutura da página inicial | `src/screens/home/sections/` |
| Aparência da página de detalhes | `src/screens/project-details/` |
| Cards e filtros | `src/components/project-card/` e `project-list/` |
| Menu, rodapé e seletor | `src/components/site-header/`, `site-footer/` e `language-switch/` |
| Cores, temas e espaçamentos | `src/styles/globals.css` |

O endereço do Fiverr fica em `contact.fiverr` e é compartilhado entre os idiomas.
Quando vazio, o contato mostra o aviso traduzido de disponibilidade futura.

## Internacionalização

São usados **i18next** e **react-i18next**, com quatro namespaces: `common`,
`home`, `profile` e `projects`. Os JSONs contêm todo o texto traduzível,
incluindo descrições dos projetos, acessibilidade, legendas, títulos e metadados.
Nomes próprios, nomes dos produtos, URLs, tecnologias e arquivos são compartilhados.
As categorias usam IDs estáveis para que os filtros funcionem em qualquer idioma.
Pluralização é resolvida pelo i18next e números usam `Intl.NumberFormat`.

As páginas são geradas em HTML no idioma correspondente. Cada documento tem
`lang` próprio e sua instância de tradução, evitando mistura de idiomas no build.
A configuração usa PT-BR como fallback e não depende de middleware ou servidor.

Para adicionar um idioma futuramente:

1. Copie os quatro JSONs para uma nova pasta em `src/i18n/locales/` e traduza os
   valores, preservando as chaves e variáveis como `{{title}}` e `{{count}}`.
2. Cadastre o idioma em `localeDefinitions` de `src/i18n/config.ts`, com nome,
   rótulo curto, prefixo da URL, locale Open Graph e direção do texto.
3. Importe e registre os quatro catálogos em `src/i18n/resources.ts`.
4. Execute os testes e o build. O seletor e as rotas estáticas serão derivados
   do registro, sem criar novas telas ou duplicar componentes.

Somente PT-BR e inglês estão cadastrados atualmente.

## Projetos e downloads

Os cards abrem páginas individuais com resumos dos READMEs. Os textos ficam nos
catálogos; os dados e links permanecem em `src/data/projects.ts`.

Downloads diretos publicados no GitHub:

- **MDReader:** APK Android 1.0.0, Android 8.0+, release `android-v1.0.0`.
- **Carrinho de Compras:** APK Carrinho Teste 1.1.0, recomendado pelo README.
- **Nosso Casamento:** APK de demonstração 1.0.0.
- **Projeto Van / RotaCerta:** `apks/VansEscola.apk`, versão 1.0.4.

Para atualizar um instalador, altere sua URL direta, nome de arquivo, versão e
`sizeMB` nos dados; atualize os requisitos e notas em ambos os catálogos de projetos.
Os APKs continuam hospedados no GitHub e são os mesmos para todos os idiomas.
O ColoringGame ainda não possui APK publicado. O resumo da imobiliária se baseia
na versão local, pois seu repositório público ainda está vazio.

## Verificações e publicação

```bash
npm run test:i18n
npm run typecheck
npm run build
npm run check:export
```

Os testes verificam catálogos, interpolação, pluralização, fallback e troca de URLs.
A verificação de exportação valida idiomas, metadados, referências internas,
links dos APKs e a navegação das páginas geradas. O build produz `out/`, que já
é a pasta publicada pela configuração existente em `netlify.toml`.

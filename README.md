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
├── data/                 # Identidade, repositórios, tecnologias e configuração de APKs
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
├── services/github-apks.ts # Descoberta, comparação de versões e cache de consultas
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
| Repositórios, tecnologias, imagens e descoberta de APKs | `src/data/projects.ts` |
| Como o APK mais recente é encontrado | `src/services/github-apks.ts` |
| Estado e botão de download dos APKs | `src/components/apk-downloads/` e `apk-download-button/` |
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

Os APKs são encontrados **durante o uso do site**, pela API pública do GitHub,
sem token no navegador e sem precisar publicar novamente o portfólio:

1. A consulta verifica assets de releases públicas e arquivos `.apk` em todas as
   pastas da branch padrão do repositório. Rascunhos são ignorados; pré-lançamentos
   públicos entram na seleção e recebem um aviso na versão exibida.
2. O padrão recomendado é **`NomeDoApp-1.2.0.apk`**. O prefixo `v` e os nomes
   anteriores, como `NossoCasamento-v2.0.0-demo.apk`, também são reconhecidos.
3. A maior versão numérica vence: `1.10.0` é maior que `1.9.0`. Publicar outra vez
   uma versão antiga não a torna mais recente. Para arquivos de release sem versão
   no nome, a versão é extraída da tag; arquivos sem nenhuma versão reconhecível
   são usados quando não há candidato versionado, pela data da alteração.
4. Na mesma versão, `preferredVariant` mantém a preferência pelo Carrinho Teste
   e pela demonstração do Nosso Casamento. Data de publicação/alteração desempata.
   O download de arquivos do repositório usa o commit do arquivo selecionado.
5. Nome, versão, tamanho, disponibilidade nos cards e o filtro **Com APK** usam o
   resultado da consulta. O ColoringGame passa a exibir o download quando receber
   seu primeiro APK, pois também tem `apkSource` cadastrado.
6. Consultas de exibição são compartilhadas por cinco minutos na aba. Ao abrir a
   página, voltar para a aba ou recuperar a conexão, a consulta é atualizada quando
   o cache expira. **O botão usa um link direto para o APK exibido**, preservando o
   clique nativo e o gerenciamento de downloads do Chrome no Android, sem aguardar
   uma consulta ou redirecionar por JavaScript. Em caso de falha de rede, limite da
   API ou consulta incompleta, há um aviso e opção de tentar novamente; o link fica
   indisponível após a falha até que uma consulta seja concluída com sucesso.

Para publicar uma atualização: envie o APK com o novo número da versão para uma
release pública ou faça commit na branch padrão do próprio projeto. APKs locais,
branches diferentes e releases em rascunho não ficam disponíveis no portfólio.

Para habilitar outro projeto, adicione `apkSource: {}` aos dados em
`src/data/projects.ts`. Não cadastre URL, tamanho ou versão manualmente. Requisitos
Android e notas de instalação continuam nos catálogos dos dois idiomas e devem ser
revisados se mudarem. Os arquivos continuam hospedados no GitHub.

O resumo da imobiliária se baseia na versão local, pois seu repositório público
ainda está vazio.

## Verificações e publicação

```bash
npm run test:i18n
npm run test:apks
npm run typecheck
npm run build
npm run check:export
```

Os testes verificam catálogos, interpolação, pluralização, fallback, troca de URLs,
ordenação das versões, descoberta de APKs, paginação e recuperação de falhas.
A verificação de exportação valida idiomas, metadados, referências internas,
estados dos downloads e a navegação das páginas geradas. O build produz `out/`, que já
é a pasta publicada pela configuração existente em `netlify.toml`.

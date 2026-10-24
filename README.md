# Portfólio Pedro Domiciano

Portfólio em Next.js com TypeScript e exportação estática para o Netlify.

## Rodar localmente

Use Node.js 22 e npm 10:

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000`.

## Projetos

A seção de projetos apresenta cards curtos com filtros por categoria e por APK
disponível. Cada card abre uma página em `/projetos/[slug]`, com resumo do README,
principais funcionalidades, tecnologias, estado atual e links para o GitHub.

Os sete projetos estão centralizados em `app/data/projects.ts`. Para atualizar um
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

As imagens de demonstração em `public/images/projects/` vêm da documentação dos
próprios projetos.

## Verificar e gerar o site

```bash
npm run typecheck
npm run build
```

O build gera a página inicial e as sete páginas de projeto em `out/`. A configuração
existente em `netlify.toml` publica essa pasta.

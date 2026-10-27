import type { ApkSource } from "../types/apk";

export const apkSources = {
  MDReader: {},
  ColoringGame: {},
  CarrinhoDeCompras: {
    variant: "standard",
    directDownloadHref: "/downloads/carrinho-de-compras.apk",
    releaseAsset: "carrinho-de-compras.apk",
  },
  NossoCasamento: { preferredVariant: "demo" },
  ProjetoVan: {},
} satisfies Record<string, ApkSource>;

import {
  BookOpenText,
  Building2,
  BusFront,
  Heart,
  Palette,
  Paintbrush,
  ShoppingCart,
} from "lucide-react";

const icons = {
  mdreader: BookOpenText,
  "coloring-game": Palette,
  "carrinho-de-compras": ShoppingCart,
  "nosso-casamento": Heart,
  "projeto-van": BusFront,
  "luiz-fernando-imobiliaria": Building2,
  "ligia-rosa-atelier": Paintbrush,
};

export function ProjectIcon({ slug, size = 24 }: { slug: string; size?: number }) {
  const Icon = icons[slug as keyof typeof icons] ?? BookOpenText;

  return <Icon size={size} strokeWidth={1.7} aria-hidden="true" />;
}

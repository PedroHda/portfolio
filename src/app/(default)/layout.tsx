import type { ReactNode } from "react";
import { DocumentLayout } from "@/layouts/document-layout";
import { defaultLocale } from "@/i18n/config";
import { getHomeMetadata } from "@/i18n/metadata";

export const generateMetadata = () => getHomeMetadata(defaultLocale);

export default function PortugueseLayout({ children }: { children: ReactNode }) {
  return <DocumentLayout locale={defaultLocale}>{children}</DocumentLayout>;
}

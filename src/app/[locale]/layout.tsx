import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { DocumentLayout } from "@/layouts/document-layout";
import { defaultLocale, isLocale, prefixedLocales } from "@/i18n/config";
import { getHomeMetadata } from "@/i18n/metadata";

type LocalizedLayoutProps = { children: ReactNode; params: Promise<{ locale: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => prefixedLocales.map((locale) => ({ locale }));

export async function generateMetadata({ params }: LocalizedLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return getHomeMetadata(locale);
}

export default async function LocalizedLayout({ children, params }: LocalizedLayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <DocumentLayout locale={locale}>{children}</DocumentLayout>;
}

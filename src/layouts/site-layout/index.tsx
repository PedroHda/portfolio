import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ApkDownloadsProvider } from "@/components/apk-downloads";
import { projects } from "@/data/projects";
import type { ProjectDefinition } from "@/types/project";

type SiteLayoutProps = {
  children: ReactNode;
  variant?: "home" | "project";
  apkProjects?: ProjectDefinition[];
};

export function SiteLayout({ children, variant = "home", apkProjects = projects }: SiteLayoutProps) {
  const compact = variant === "project";

  return (
    <ApkDownloadsProvider projects={apkProjects}>
      <SiteHeader compact={compact} />
      {children}
      <SiteFooter compact={compact} />
    </ApkDownloadsProvider>
  );
}

import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type SiteLayoutProps = {
  children: ReactNode;
  variant?: "home" | "project";
};

export function SiteLayout({ children, variant = "home" }: SiteLayoutProps) {
  const compact = variant === "project";

  return (
    <>
      <SiteHeader compact={compact} />
      {children}
      <SiteFooter compact={compact} />
    </>
  );
}

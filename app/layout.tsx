import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedro Domiciano | Desenvolvedor Fullstack",
  description:
    "Portfólio de Pedro Domiciano, desenvolvedor Fullstack com experiência em .NET, React, TypeScript, REST APIs e automações para engenharia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

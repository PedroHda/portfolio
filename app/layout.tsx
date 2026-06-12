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
  const themeScript = `
    (() => {
      try {
        const storedTheme = localStorage.getItem("theme");
        const systemTheme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        const theme = storedTheme === "dark" || storedTheme === "light" ? storedTheme : systemTheme;
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
      } catch {
        document.documentElement.dataset.theme = "light";
      }
    })();
  `;

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header"; // 1. Importe o Header

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfólio de Diogo Martins",
  description: "Desenvolvimento de sites para negócios locais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
    <html lang="pt-BR">
      {/* Aplicando a cor de fundo e a cor do texto padrão para todo o site */}
      <body className={`${inter.className} bg-zinc-950 text-slate-300`}>
        <Header />
        {children}
      </body>
    </html>
  );

}
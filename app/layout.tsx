// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header"; // 1. Importe o Header
import { AnimatedStarrySky } from "@/components/AnimatedStarrySky"; 

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
     <body className={`${inter.className} text-slate-300`}>
        <AnimatedStarrySky /> {/* 2. Adicione o componente do fundo animado aqui */}
        <Header />
        <main className="relative z-10"> {/* 3. Adicione 'relative z-10' ao conteúdo principal */}
          {children}
        </main>
      </body>
    </html>
  );

}
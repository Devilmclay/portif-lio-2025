"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
// A CORREÇÃO ESTÁ AQUI:
// Trocamos o caminho antigo e incorreto ('next-themes/dist/types')
// pelo caminho correto, que é a raiz do pacote.
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
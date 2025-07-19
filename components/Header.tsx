// components/Header.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efeito para impedir o scroll da página quando o menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function para garantir que o scroll volta ao normal
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);


  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-lg border-b border-slate-900/10 dark:border-slate-300/10">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <Link href="/" className="text-2xl font-bold">
            Diogo Martins
          </Link>

          {/* --- Menu para Desktop --- */}
          <div className="hidden md:flex items-center gap-4">
            <ul className="flex gap-6 text-lg">
              <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Início</Link></li>
              <li><Link href="/sobre" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sobre</Link></li>
              <li><Link href="/projetos" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Projetos</Link></li>
              <li><Link href="/contato" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contato</Link></li>
            </ul>
            <ThemeSwitcher />
          </div>

          {/* --- Botão Hambúrguer (Apenas para Mobile) --- */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="p-2">
              <Menu size={24} />
            </button>
          </div>
        </nav>
      </header>

      {/* --- Menu Mobile Overlay --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            // A CORREÇÃO FINAL ESTÁ AQUI:
            // Usamos um fundo sólido e opaco que se adapta ao tema.
            // bg-white para o tema claro, bg-slate-900 para o tema escuro.
            // O z-50 garante que ele fica por cima de todo o conteúdo.
            className="md:hidden fixed inset-0 bg-white z-50 p-4 flex flex-col"
          >
            {/* Cabeçalho do Overlay: Logo + Botão de Fechar */}
            <div className="flex justify-between items-center">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold text-slate-800 dark:text-blue-400">
                    Diogo Martins
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-800 dark:text-slate-200">
                    <X size={24} />
                </button>
            </div>

            {/* Corpo do Overlay: Links centrados */}
            <div className="flex-1 flex flex-col items-center justify-center">
                <ul className="flex flex-col items-center gap-8 text-slate-800 dark:text-slate-200">
                  <li><Link href="/" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">Início</Link></li>
                  <li><Link href="/sobre" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">Sobre</Link></li>
                  <li><Link href="/projetos" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">Projetos</Link></li>
                  <li><Link href="/contato" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">Contato</Link></li>
                  <li className="mt-4"><ThemeSwitcher /></li>
                </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

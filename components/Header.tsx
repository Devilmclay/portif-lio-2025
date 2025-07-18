// components/Header.tsx
import Link from 'next/link'; // Importe o componente Link do Next.js
import { ThemeSwitcher } from './ThemeSwitcher'; // Importe o seletor

export default function Header() {
  return (
     <header className="sticky top-0 z-50 backdrop-blur-lg border-b dark:border-slate-300/10 border-slate-900/10">
      <nav className="container mx-auto flex justify-between items-center p-4 text-slate-100">
        <Link href="/" className="text-2xl font-bold text-blue-400">
          Meu Portfólio
        </Link>
        <ul className="flex gap-6 text-lg">
          <li>
            <Link href="/" className="hover:text-blue-400 transition-colors">
              Início
            </Link>
          </li>
          <li>
            <Link href="/sobre" className="hover:text-blue-400 transition-colors">
              Sobre
            </Link>
          </li>
          <li>
            <Link href="/projetos" className="hover:text-blue-400 transition-colors">
              Projetos
            </Link>
          </li>
                <li>
            <Link href="/contato" className="hover:text-blue-400 transition-colors">
              Contato
            </Link>
          </li>
        </ul>
        <ThemeSwitcher /> {/* Adicione o botão aqui */}
      </nav>
    </header>
  );
}
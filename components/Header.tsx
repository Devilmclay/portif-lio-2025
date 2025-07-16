// components/Header.tsx
import Link from 'next/link'; // Importe o componente Link do Next.js

export default function Header() {
  return (
     <header className="bg-zinc-800/80 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center p-4 text-slate-100">
        <Link href="/" className="text-2xl font-bold text-amber-600">
          Meu Portfólio
        </Link>
        <ul className="flex gap-6 text-lg">
          <li>
            <Link href="/" className="hover:text-amber-500 transition-colors">
              Início
            </Link>
          </li>
          <li>
            <Link href="/sobre" className="hover:text-amber-500 transition-colors">
              Sobre
            </Link>
          </li>
          <li>
            <Link href="/projetos" className="hover:text-amber-500 transition-colors">
              Projetos
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
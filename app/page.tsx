// app/page.tsx
import Image from 'next/image';
import { MotionDiv } from '@/components/MotionDiv';

export default function HomePage() {
  return (
    <main className="container mx-auto flex min-h-[calc(100vh-68px)] flex-col md:flex-row items-center justify-center gap-12 px-4">
      
      {/* Coluna da Imagem Estilizada */}
      <MotionDiv
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-64 h-64 md:w-80 md:h-80 relative">
          <Image
            src="/images/foto-perfil.jpeg"
            alt="Foto de perfil de Diogo"
            fill
            // A MÁGICA ESTÁ AQUI:
            // 1. rounded-2xl: Cantos bem arredondados, mas não um círculo.
            // 2. object-cover: Garante que a imagem preenche o espaço sem distorcer.
            // 3. shadow-lg: Uma sombra padrão suave.
            // 4. shadow-amber-500/20: Uma sombra colorida com a sua cor de destaque e 20% de opacidade, criando um efeito de "brilho".
            className="rounded-2xl object-cover shadow-lg shadow-amber-500/20"
          />
        </div>
      </MotionDiv>

      {/* Coluna do Texto */}
      <MotionDiv
        className="text-center md:text-left"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-slate-100">
          Diogo Martins
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-amber-400 font-semibold">
          Estudante de Engenharia da Computação | Desenvolvedor Web
        </p>
        <p className="mt-2 max-w-xl text-lg text-slate-300">
          Transformando ideias em soluções digitais para negócios em Olímpia e região.
        </p>
      </MotionDiv>

    </main>
  );
}
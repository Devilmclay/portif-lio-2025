// app/page.tsx
import Image from 'next/image';
import { MotionDiv } from '@/components/MotionDiv';
import { PageWrapper } from '@/components/PageWrapper'; // 1. Importe o novo componente
export default function HomePage() {
  return (
  <PageWrapper>
    <main className="container mx-auto flex min-h-[calc(100vh-68px)] flex-col md:flex-row items-center justify-center gap-12 px-4">
      
      {/* Coluna da Imagem Estilizada */}
     
        <div className="w-64 h-64 md:w-100 md:h-180 relative">
          <Image
            src="/images/foto-perfil.jpeg"
            alt="Foto de perfil de Diogo"
            fill
            // A MÁGICA ESTÁ AQUI:
            // 1. rounded-2xl: Cantos bem arredondados, mas não um círculo.
            // 2. object-cover: Garante que a imagem preenche o espaço sem distorcer.
            // 3. shadow-lg: Uma sombra padrão suave.
            // 4. shadow-amber-500/20: Uma sombra colorida com a sua cor de destaque e 20% de opacidade, criando um efeito de "brilho".
            className="rounded-2xl object-cover shadow-lg shadow-blue-500/20"
          />
        </div>
     

      {/* Coluna do Texto */}
      <div
        className="text-center md:text-left"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-slate-100">
          Diogo Martins
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-cyan-600 font-semibold">
          Estudante de Engenharia da Computação | Desenvolvedor Web
        </p>
        <p className="mt-2 max-w-xl text-lg text-slate-300">
          Transformando ideias em soluções digitais para negócios em Olímpia e região.
        </p>
      </div>

    </main>
   </PageWrapper> 
  );
}
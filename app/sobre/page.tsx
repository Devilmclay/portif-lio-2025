import Image from 'next/image';
import { PageWrapper } from '@/components/PageWrapper';
export default function SobrePage() {
  return (
    // A tag <main> NÃO DEVE ter nenhuma classe de background como 'bg-white' ou 'bg-background'.
    // As classes 'container', 'mx-auto', etc., são para layout e espaçamento, estão corretas.
    <PageWrapper>
    <main className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-center gap-12">
      
      {/* Coluna da Imagem */}
      <div className="w-48 h-48 md:w-72 md:h-72 relative">
        <Image
          src="/images/foto-perfil.jpeg"
          alt="Foto de perfil de Diogo"
          fill
          className="rounded-full object-cover border-4 border-blue-500"
        />
      </div>

      {/* Coluna do Texto */}
      <div
        className="md:w-1/2 text-center md:text-left"

      >
        <h1 className="text-4xl md:text-5xl font-bold text-slate-100">Sobre Mim</h1>
        <p className="mt-4 text-lg">
          Olá! Sou Diogo, um estudante de Engenharia da Computação de Olímpia-SP, 
          apaixonado por criar soluções digitais que geram resultados reais.
        </p>
        <p className="mt-4 text-lg">
          Minha missão é usar a tecnologia para ajudar pequenos e médios negócios locais a 
          construírem uma presença online forte, moderna e eficaz. Acredito que um bom site 
          é a porta de entrada para novas oportunidades e clientes.
        </p>
      </div>
    </main>
   </PageWrapper> 
  );
}

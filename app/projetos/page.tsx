// app/projetos/page.tsx
import Image from 'next/image';
import { PageWrapper } from '@/components/PageWrapper';
// Um array de exemplo com seus projetos. No futuro, isso pode vir de um banco de dados.
const listaDeProjetos = [
  {
    id: 1,
    nome: "Site para Barbearia do Zé",
    descricao: "Um site moderno com agendamento online para aumentar a captação de clientes.",
    tecnologias: "Next.js, Tailwind CSS, Vercel",
    imagem: "/images/barbearia.jpg" // Adicione esta linha
  },
  {
    id: 2,
    nome: "Cardápio Digital da Pizzaria Forno a Lenha",
    descricao: "Cardápio digital com QR Code e botão direto para pedidos no WhatsApp.",
    tecnologias: "Astro, JavaScript, Netlify",
    imagem: "/images/forno.jpg" // Adicione esta linha
  },
  {
    id: 3,
    nome: "Landing Page para Nutricionista",
    descricao: "Página focada em conversão para capturar contatos para agendamento de consultas.",
    tecnologias: "HTML, CSS, JavaScript",
    imagem: "/images/nutri.jpg" // Adicione esta linha
  }
];

export default function ProjetosPage() {
  return (
 <PageWrapper>  
 <main className="container mx-auto px-4 py-16">
  <h1 className="text-center text-4xl md:text-5xl font-bold text-slate-100 mb-12">
    Meus Projetos
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {listaDeProjetos.map((projeto) => (
      // O card agora é um link para um futuro detalhe do projeto
      <div key={projeto.id} className="bg-zinc-800 rounded-lg overflow-hidden group">
        <div className="relative h-48 w-full">
          <Image
            src={projeto.imagem}
            alt={`Imagem do projeto ${projeto.nome}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-400">{projeto.nome}</h2>
          <p className="mt-2 text-slate-300">{projeto.descricao}</p>
          <p className="mt-4 text-sm font-semibold text-slate-400">
            Tecnologias: {projeto.tecnologias}
          </p>
        </div>
      </div>
    ))}
  </div>
</main>
</PageWrapper> 

  );
}
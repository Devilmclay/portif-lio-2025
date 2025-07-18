// app/contato/page.tsx
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageWrapper } from '@/components/PageWrapper';
import { Mail } from 'lucide-react'; // Ícone de e-mail

export default function ContatoPage() {
  const numeroWhatsApp = "5517981662681"; // <-- SUBSTITUA PELO SEU NÚMERO
  const email = "diogomartins.96@hotmail.com"; // <-- SUBSTITUA PELO SEU E-MAIL

  return (
    <PageWrapper>
    <div
    
      className="container mx-auto my-24 flex flex-col items-center justify-center gap-8 px-4 text-center"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900">Vamos Conversar?</h1>
      <p className="max-w-2xl text-lg text-slate-800">
        Estou sempre aberto a novas oportunidades, projetos e colaborações. Se você tem uma ideia e precisa de ajuda para a colocar online, não hesite em me contatar.
      </p>
      
      {/* Botão do WhatsApp será inserido aqui */}
      <WhatsAppButton phone={numeroWhatsApp} />

      <div className="mt-8 text-slate-600">
        <p>Se preferir, também pode me enviar um e-mail:</p>
        <a href={`mailto:${email}`} className="mt-2 inline-flex items-center gap-2 text-lg text-blue-400 hover:text-blue-300 transition-colors">
          <Mail size={20} />
          {email}
        </a>
      </div>
    </div>
   </PageWrapper> 
  );
}

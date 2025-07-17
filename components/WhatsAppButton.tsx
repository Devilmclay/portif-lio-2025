// components/WhatsAppButton.tsx
"use client"; // Este componente é interativo

import { MessageCircle } from 'lucide-react'; // Ícone do WhatsApp

// Definimos os tipos das props que o componente vai receber
interface WhatsAppButtonProps {
  phone: string;
  message?: string;
}

export function WhatsAppButton({ phone, message }: WhatsAppButtonProps) {
  // Mensagem padrão se nenhuma for fornecida
  const defaultMessage = "Olá! Vi seu portfólio e gostaria de conversar sobre um projeto.";
  
  // Codifica a mensagem para ser usada numa URL
  const encodedMessage = encodeURIComponent(message || defaultMessage);

  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank" // Abre numa nova aba
      rel="noopener noreferrer" // Boas práticas de segurança para links externos
      className="mt-6 inline-flex items-center justify-center gap-3 rounded-lg bg-emerald-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:bg-emerald-500 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
    >
      <MessageCircle size={24} />
      Iniciar Conversa no WhatsApp
    </a>
  );
}

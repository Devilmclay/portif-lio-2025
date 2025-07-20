"use client";

import { useState, useEffect, useRef } from "react";
import { BudgetDisplay } from "./BudgetDisplay";
import { Send } from "lucide-react";

// Definimos os tipos para as nossas mensagens e para o orçamento
type Message = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

type Budget = {
  project_summary: string;
  estimated_hours: { design: number; development: number; total: number; };
  estimated_price_brl: number;
  breakdown: { item: string; description: string; }[];
  next_steps: string;
};

// O prompt inicial que "treina" a nossa IA. É a primeira mensagem que enviamos.
const initialPrompt = `Você é um assistente de orçamentos virtual para um desenvolvedor web freelancer chamado Diogo Martins. O seu objetivo  é conversar com potenciais clientes para recolher os requisitos de um projeto de site e, no final, gerar um orçamento estimado. O seu processo é: 1. Apresente-se de forma amigável. 2. Faça perguntas para entender o que o cliente precisa. Pergunte sobre: o tipo de site (ex: Landing Page, Institucional, E-commerce), o número aproximado de páginas, e funcionalidades especiais (ex: blog, galeria de fotos, formulário de contato, sistema de agendamento). 3. Com base nas respostas, quando tiver informação suficiente, você deve fornecer a sua resposta final exclusivamente no formato JSON, com a seguinte estrutura: {"project_summary": "...", "estimated_hours": {"design": 20, "development": 40, "total": 60}, "estimated_price_brl": 2400.00, "breakdown": [{"item": "...", "description": "..."}], "next_steps": "..."}. Regra de cálculo: Use um valor base de R$ 40,00 por hora para o seu cálculo de preço. Seja realista na estimativa de horas. Uma Landing Page simples pode levar 15-20 horas, enquanto um site institucional com blog pode levar 50-60 horas. Importante: A sua primeira resposta deve ser apenas uma saudação amigável e a primeira pergunta para o cliente. Não gere o JSON na primeira resposta. O seu único objetivo final é recolher informação suficiente para gerar o JSON do orçamento. Não se desvie dessa tarefa nem ofereça ajuda para codificar ou criar o site.`;

export function Chat() {
  // --- GESTÃO DE ESTADO ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [budget, setBudget] = useState<Budget | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // --- EFEITOS ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const startConversation = async () => {
      setIsLoading(true);
      const initialMessage: Message = { role: 'user', parts: [{ text: initialPrompt }] };
      const response = await callGeminiAPI([initialMessage]);
      if (response) {
        setMessages([response]);
      }
      setIsLoading(false);
    };
    startConversation();
  }, []);

  // --- FUNÇÕES ---
  const getMockResponse = async (chatHistory: Message[]) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const lastUserMessage = chatHistory[chatHistory.length - 1]?.parts[0]?.text.toLowerCase();

    if (lastUserMessage.includes("ecommerce") || lastUserMessage.includes("loja")) {
      return {
        role: 'model',
        parts: [{
          text: JSON.stringify({
            "project_summary": "Um site de e-commerce para venda de produtos online, com 5 páginas e integração de pagamentos.",
            "estimated_hours": { "design": 30, "development": 70, "total": 100 },
            "estimated_price_brl": 4000.00,
            "breakdown": [
              { "item": "Design de UI/UX para Loja Virtual", "description": "Criação de layout para home, categorias, produto e checkout." },
              { "item": "Desenvolvimento Front-End", "description": "Construção de 5 páginas responsivas." },
              { "item": "Configuração de E-commerce", "description": "Integração com sistema de produtos e pagamentos." }
            ],
            "next_steps": "Obrigado! Esta é uma estimativa para o seu e-commerce. O próximo passo é o Diogo entrar em contato. Por favor, deixe o seu nome e contato."
          })
        }]
      };
    }
    return { role: 'model', parts: [{ text: "(Modo de Demonstração) Entendido. E que tipo de funcionalidades especiais você gostaria de ter? Por exemplo, um blog ou galeria de fotos?" }] };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const response = isDemoMode
      ? await getMockResponse(newMessages)
      : await callGeminiAPI(newMessages);

    if (response) {
      try {
        const cleanedJsonString = response.parts[0].text.replace(/```json\n|```/g, '').trim();
        const parsedData = JSON.parse(cleanedJsonString);
        const budgetData = Array.isArray(parsedData) ? parsedData[0] : parsedData;

        if (budgetData && budgetData.estimated_price_brl) {
          setBudget(budgetData);
        } else {
          setMessages([...newMessages, response]);
        }
      } catch (error) {
        setMessages([...newMessages, response]);
      }
    }
    setIsLoading(false);
  };

  const callGeminiAPI = async (chatHistory: Message[]) => {
    try {
      const formattedHistory = chatHistory.map(msg => ({
        role: msg.role,
        parts: msg.parts,
      }));

      const payload = {
        contents: formattedHistory,
      };
      
      const apiKey = "AIzaSyB5K5buGFT61W7s5gEHjAk0M95eu6vycXc"; // Lembre-se de colocar a sua chave aqui
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`API call failed with status: ${res.status}`);
      }

      const result = await res.json();
      
      if (result.candidates && result.candidates.length > 0) {
        return result.candidates[0].content;
      }
      return null;

    } catch (error: unknown) {
      console.error("Erro ao chamar a API da Gemini:", error);
      // ✅ CORREÇÃO APLICADA AQUI:
      // A gestão de erros agora é mais inteligente.
      if (error instanceof Error && error.message.includes("403")) {
        // Se o erro for 403 (chave inválida), ativamos o modo de demonstração.
        setIsDemoMode(true);
        return { role: 'model', parts: [{ text: "Ocorreu um problema com a chave da API. Ativando o modo de demonstração." }] };
      }
      // Para qualquer outro erro, mostramos uma mensagem temporária e não ativamos o modo de demonstração.
      return { role: 'model', parts: [{ text: "Desculpe, ocorreu um erro de conexão. Por favor, verifique a sua internet e tente novamente." }] };
    }
  };

  // --- RENDERIZAÇÃO ---
  if (budget) {
    return <BudgetDisplay budget={budget} />;
  }

  return (
    <div className="bg-card border border-border rounded-lg max-w-3xl mx-auto shadow-lg relative">
      {isDemoMode && (
        <div className="absolute top-0 left-0 right-0 p-2 bg-yellow-500/20 text-yellow-800 dark:text-yellow-300 text-center text-xs rounded-t-lg">
          Modo de Demonstração Ativo
        </div>
      )}
      <div className={`h-[60vh] overflow-y-auto p-4 space-y-4 ${isDemoMode ? 'pt-10' : ''}`}>
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-md p-3 rounded-lg bg-muted">
              <p className="animate-pulse">Digitando...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-border flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Descreva o seu projeto..."
          className="flex-grow bg-muted border border-border rounded-full px-4 py-2 focus-outline-none focus:ring-2 focus:ring-primary"
          disabled={isLoading}
        />
        <button type="submit" className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90 disabled:bg-primary/50" disabled={isLoading}>
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

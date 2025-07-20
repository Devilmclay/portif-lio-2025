import { Chat } from "@/components/Chat";
import { PageWrapper } from "@/components/PageWrapper";

export default function OrcamentoPage() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Orçamento Inteligente
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Converse com o nosso assistente virtual para obter uma estimativa instantânea para o seu projeto.
          </p>
        </header>
        
        {/* Renderizamos o componente principal do chat aqui */}
        <Chat />
      </div>
    </PageWrapper>
  );
}
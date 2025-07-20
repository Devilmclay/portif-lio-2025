type Budget = {
  project_summary: string;
  estimated_hours: {
    design: number;
    development: number;
    total: number;
  };
  estimated_price_brl: number;
  breakdown: { item: string; description: string }[];
  next_steps: string;
};

export function BudgetDisplay({ budget }: { budget: Budget }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8 animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Sua Estimativa de Orçamento está Pronta!</h2>
      <p className="text-muted-foreground mb-6">{budget.project_summary}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
        <div className="bg-muted p-4 rounded-md">
          <p className="text-sm text-muted-foreground">Horas de Design</p>
          <p className="text-2xl font-bold text-foreground">{budget.estimated_hours.design}h</p>
        </div>
        <div className="bg-muted p-4 rounded-md">
          <p className="text-sm text-muted-foreground">Horas de Desenvolvimento</p>
          <p className="text-2xl font-bold text-foreground">{budget.estimated_hours.development}h</p>
        </div>
        <div className="bg-muted p-4 rounded-md">
          <p className="text-sm text-muted-foreground">Total de Horas</p>
          <p className="text-2xl font-bold text-foreground">{budget.estimated_hours.total}h</p>
        </div>
      </div>

      <div className="border-t border-border pt-6 mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">Detalhamento do Projeto</h3>
        <ul className="space-y-3">
          {budget.breakdown.map((item, index) => (
            <li key={index} className="pb-3 border-b border-border/50">
              <p className="font-semibold text-primary">{item.item}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="text-center bg-primary/10 border border-primary/20 p-6 rounded-lg">
        <p className="text-lg text-muted-foreground">Valor Estimado</p>
        <p className="text-4xl md:text-5xl font-bold text-primary my-2">
          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(budget.estimated_price_brl)}
        </p>
        <p className="text-sm text-muted-foreground">Este é um valor aproximado. O preço final pode variar.</p>
      </div>

      <div className="mt-8 bg-muted p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-foreground mb-2">Próximos Passos</h3>
        <p className="text-muted-foreground">{budget.next_steps}</p>
      </div>
    </div>
  );
}

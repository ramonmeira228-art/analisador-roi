export interface Campaign {
  id: string;
  nome: string;
  objetivo: string;
  orcamentoDiario: number;
  valorGasto: number;
  impressoes: number;
  alcance: number;
  cliques: number;
  ctr: number;
  cpc: number;
  cpm: number;
  visualizacoesPagina: number;
  checkoutIniciado: number;
  compras: number;
  cpa: number;
  ticketMedio: number;
  roas: number;
  frequencia: number;
  tempoCampanha: number;
}

export interface Analysis {
  status: 'Escalar' | 'Ajustar' | 'Pausar';
  statusColor: string;
  gargalos: string[];
  recomendacoes: string[];
  pontosFortess: string[];
  score: number;
}

export interface MetricComparison {
  metric: string;
  value: number;
  ideal: number | string;
  status: 'good' | 'warning' | 'bad';
  message: string;
}

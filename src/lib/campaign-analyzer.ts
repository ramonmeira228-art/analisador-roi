import { Campaign, Analysis, MetricComparison } from './types';

// Parâmetros ideais para produtos low ticket
const PARAMETROS_IDEAIS = {
  ctr: { min: 1.5, ideal: 3, max: 5 },
  cpc: { min: 0.5, ideal: 2, max: 5 },
  cpm: { min: 10, ideal: 30, max: 60 },
  roas: { min: 2, ideal: 3, max: 10 },
  cpa: { maxPercentTicket: 40 }, // CPA deve ser no máximo 40% do ticket médio
  frequencia: { min: 1.5, ideal: 3, max: 5 },
  taxaConversaoCheckout: { min: 20, ideal: 40, max: 100 }, // % de checkouts que viram compra
  taxaConversaoClique: { min: 1, ideal: 3, max: 10 }, // % de cliques que viram compra
};

export function analisarCampanha(campaign: Campaign): Analysis {
  const gargalos: string[] = [];
  const recomendacoes: string[] = [];
  const pontosFortess: string[] = [];
  let score = 100;

  // Análise de CTR
  if (campaign.ctr < PARAMETROS_IDEAIS.ctr.min) {
    gargalos.push(`CTR muito baixo (${campaign.ctr.toFixed(2)}%)`);
    recomendacoes.push('Melhore criativos e copy dos anúncios para aumentar CTR');
    score -= 15;
  } else if (campaign.ctr >= PARAMETROS_IDEAIS.ctr.ideal) {
    pontosFortess.push(`Excelente CTR (${campaign.ctr.toFixed(2)}%)`);
  }

  // Análise de CPC
  if (campaign.cpc > PARAMETROS_IDEAIS.cpc.max) {
    gargalos.push(`CPC muito alto (R$ ${campaign.cpc.toFixed(2)})`);
    recomendacoes.push('Refine segmentação de público para reduzir CPC');
    score -= 15;
  } else if (campaign.cpc <= PARAMETROS_IDEAIS.cpc.ideal) {
    pontosFortess.push(`CPC otimizado (R$ ${campaign.cpc.toFixed(2)})`);
  }

  // Análise de ROAS
  if (campaign.roas < PARAMETROS_IDEAIS.roas.min) {
    gargalos.push(`ROAS abaixo do mínimo (${campaign.roas.toFixed(2)}x)`);
    recomendacoes.push('Campanha não está sendo lucrativa - revisar estratégia completa');
    score -= 25;
  } else if (campaign.roas >= PARAMETROS_IDEAIS.roas.ideal) {
    pontosFortess.push(`ROAS excelente (${campaign.roas.toFixed(2)}x)`);
  }

  // Análise de CPA vs Ticket Médio
  const cpaPercentual = (campaign.cpa / campaign.ticketMedio) * 100;
  if (cpaPercentual > PARAMETROS_IDEAIS.cpa.maxPercentTicket) {
    gargalos.push(`CPA representa ${cpaPercentual.toFixed(0)}% do ticket médio`);
    recomendacoes.push('Reduza CPA otimizando funil de conversão');
    score -= 20;
  } else if (cpaPercentual <= 30) {
    pontosFortess.push(`CPA saudável (${cpaPercentual.toFixed(0)}% do ticket)`);
  }

  // Análise de Frequência
  if (campaign.frequencia > PARAMETROS_IDEAIS.frequencia.max) {
    gargalos.push(`Frequência muito alta (${campaign.frequencia.toFixed(2)})`);
    recomendacoes.push('Amplie público ou pause campanha para evitar saturação');
    score -= 10;
  } else if (campaign.frequencia >= PARAMETROS_IDEAIS.frequencia.min && campaign.frequencia <= PARAMETROS_IDEAIS.frequencia.ideal) {
    pontosFortess.push(`Frequência ideal (${campaign.frequencia.toFixed(2)})`);
  }

  // Análise de Taxa de Conversão (Checkout → Compra)
  const taxaConversaoCheckout = campaign.checkoutIniciado > 0 
    ? (campaign.compras / campaign.checkoutIniciado) * 100 
    : 0;
  
  if (taxaConversaoCheckout < PARAMETROS_IDEAIS.taxaConversaoCheckout.min && campaign.checkoutIniciado > 0) {
    gargalos.push(`Baixa conversão checkout→compra (${taxaConversaoCheckout.toFixed(1)}%)`);
    recomendacoes.push('Otimize processo de checkout e reduza fricções');
    score -= 15;
  } else if (taxaConversaoCheckout >= PARAMETROS_IDEAIS.taxaConversaoCheckout.ideal) {
    pontosFortess.push(`Ótima conversão no checkout (${taxaConversaoCheckout.toFixed(1)}%)`);
  }

  // Análise de Taxa de Conversão (Clique → Compra)
  const taxaConversaoClique = campaign.cliques > 0 
    ? (campaign.compras / campaign.cliques) * 100 
    : 0;
  
  if (taxaConversaoClique < PARAMETROS_IDEAIS.taxaConversaoClique.min && campaign.cliques > 0) {
    gargalos.push(`Baixa conversão clique→compra (${taxaConversaoClique.toFixed(2)}%)`);
    recomendacoes.push('Melhore página de destino e oferta para aumentar conversões');
    score -= 15;
  }

  // Análise de CPM
  if (campaign.cpm > PARAMETROS_IDEAIS.cpm.max) {
    gargalos.push(`CPM elevado (R$ ${campaign.cpm.toFixed(2)})`);
    recomendacoes.push('Teste novos públicos com CPM mais baixo');
    score -= 10;
  }

  // Determinar status final
  let status: 'Escalar' | 'Ajustar' | 'Pausar';
  let statusColor: string;

  if (score >= 80 && campaign.roas >= PARAMETROS_IDEAIS.roas.ideal) {
    status = 'Escalar';
    statusColor = 'from-emerald-500 to-green-600';
    recomendacoes.unshift('✅ Campanha performando bem - aumente orçamento gradualmente');
  } else if (score >= 50 || (campaign.roas >= PARAMETROS_IDEAIS.roas.min && campaign.roas < PARAMETROS_IDEAIS.roas.ideal)) {
    status = 'Ajustar';
    statusColor = 'from-amber-500 to-orange-600';
    recomendacoes.unshift('⚠️ Campanha precisa de otimizações antes de escalar');
  } else {
    status = 'Pausar';
    statusColor = 'from-red-500 to-rose-600';
    recomendacoes.unshift('🛑 Campanha não lucrativa - pause e reestruture completamente');
  }

  return {
    status,
    statusColor,
    gargalos: gargalos.length > 0 ? gargalos : ['Nenhum gargalo crítico identificado'],
    recomendacoes,
    pontosFortess: pontosFortess.length > 0 ? pontosFortess : ['Analise mais dados para identificar pontos fortes'],
    score: Math.max(0, score),
  };
}

export function getMetricComparisons(campaign: Campaign): MetricComparison[] {
  const comparisons: MetricComparison[] = [];

  // CTR
  comparisons.push({
    metric: 'CTR',
    value: campaign.ctr,
    ideal: `${PARAMETROS_IDEAIS.ctr.ideal}%+`,
    status: campaign.ctr >= PARAMETROS_IDEAIS.ctr.ideal ? 'good' : campaign.ctr >= PARAMETROS_IDEAIS.ctr.min ? 'warning' : 'bad',
    message: campaign.ctr >= PARAMETROS_IDEAIS.ctr.ideal ? 'Excelente' : campaign.ctr >= PARAMETROS_IDEAIS.ctr.min ? 'Aceitável' : 'Crítico',
  });

  // CPC
  comparisons.push({
    metric: 'CPC',
    value: campaign.cpc,
    ideal: `R$ ${PARAMETROS_IDEAIS.cpc.ideal}`,
    status: campaign.cpc <= PARAMETROS_IDEAIS.cpc.ideal ? 'good' : campaign.cpc <= PARAMETROS_IDEAIS.cpc.max ? 'warning' : 'bad',
    message: campaign.cpc <= PARAMETROS_IDEAIS.cpc.ideal ? 'Ótimo' : campaign.cpc <= PARAMETROS_IDEAIS.cpc.max ? 'Aceitável' : 'Alto',
  });

  // ROAS
  comparisons.push({
    metric: 'ROAS',
    value: campaign.roas,
    ideal: `${PARAMETROS_IDEAIS.roas.ideal}x+`,
    status: campaign.roas >= PARAMETROS_IDEAIS.roas.ideal ? 'good' : campaign.roas >= PARAMETROS_IDEAIS.roas.min ? 'warning' : 'bad',
    message: campaign.roas >= PARAMETROS_IDEAIS.roas.ideal ? 'Excelente' : campaign.roas >= PARAMETROS_IDEAIS.roas.min ? 'Mínimo' : 'Prejuízo',
  });

  // Frequência
  comparisons.push({
    metric: 'Frequência',
    value: campaign.frequencia,
    ideal: `${PARAMETROS_IDEAIS.frequencia.ideal}`,
    status: campaign.frequencia <= PARAMETROS_IDEAIS.frequencia.max && campaign.frequencia >= PARAMETROS_IDEAIS.frequencia.min ? 'good' : campaign.frequencia > PARAMETROS_IDEAIS.frequencia.max ? 'bad' : 'warning',
    message: campaign.frequencia <= PARAMETROS_IDEAIS.frequencia.max && campaign.frequencia >= PARAMETROS_IDEAIS.frequencia.min ? 'Ideal' : campaign.frequencia > PARAMETROS_IDEAIS.frequencia.max ? 'Saturação' : 'Baixa',
  });

  return comparisons;
}

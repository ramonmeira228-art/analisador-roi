'use client';

import { Campaign, Analysis } from '@/lib/types';
import { analisarCampanha, getMetricComparisons } from '@/lib/campaign-analyzer';
import { TrendingUp, AlertTriangle, XCircle, CheckCircle, Target, Zap } from 'lucide-react';

interface AnalysisCardProps {
  campaign: Campaign;
}

export function AnalysisCard({ campaign }: AnalysisCardProps) {
  const analysis: Analysis = analisarCampanha(campaign);
  const comparisons = getMetricComparisons(campaign);

  const StatusIcon = analysis.status === 'Escalar' ? TrendingUp : analysis.status === 'Ajustar' ? AlertTriangle : XCircle;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
      {/* Header com Status */}
      <div className={`bg-gradient-to-r ${analysis.statusColor} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <StatusIcon className="w-10 h-10" />
            <div>
              <h3 className="text-2xl font-bold">{campaign.nome}</h3>
              <p className="text-white/90 mt-1">{campaign.objetivo}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{analysis.status}</div>
            <div className="text-sm text-white/80 mt-1">Score: {analysis.score}/100</div>
          </div>
        </div>
      </div>

      {/* Comparações de Métricas */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-blue-600" />
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Comparação com Parâmetros Ideais
          </h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {comparisons.map((comp) => (
            <div
              key={comp.metric}
              className={`p-4 rounded-xl border-2 ${
                comp.status === 'good'
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                  : comp.status === 'warning'
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/20'
                  : 'border-red-500 bg-red-50 dark:bg-red-950/20'
              }`}
            >
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {comp.metric}
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">
                {typeof comp.value === 'number' ? comp.value.toFixed(2) : comp.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Ideal: {comp.ideal}
              </div>
              <div
                className={`text-xs font-semibold mt-2 ${
                  comp.status === 'good'
                    ? 'text-green-700 dark:text-green-400'
                    : comp.status === 'warning'
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-red-700 dark:text-red-400'
                }`}
              >
                {comp.message}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pontos Fortes */}
      {analysis.pontosFortess.length > 0 && analysis.pontosFortess[0] !== 'Analise mais dados para identificar pontos fortes' && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-green-50 dark:bg-green-950/10">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Pontos Fortes
            </h4>
          </div>
          <ul className="space-y-2">
            {analysis.pontosFortess.map((ponto, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-green-600 mt-1">✓</span>
                <span>{ponto}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Gargalos */}
      {analysis.gargalos.length > 0 && analysis.gargalos[0] !== 'Nenhum gargalo crítico identificado' && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-red-50 dark:bg-red-950/10">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Gargalos Identificados
            </h4>
          </div>
          <ul className="space-y-2">
            {analysis.gargalos.map((gargalo, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                <span className="text-red-600 mt-1">⚠</span>
                <span>{gargalo}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recomendações */}
      <div className="p-6 bg-blue-50 dark:bg-blue-950/10">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-blue-600" />
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recomendações de Ação
          </h4>
        </div>
        <ul className="space-y-3">
          {analysis.recomendacoes.map((rec, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Métricas Resumidas */}
      <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Gasto Total</div>
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
              R$ {campaign.valorGasto.toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Compras</div>
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {campaign.compras}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Receita</div>
            <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
              R$ {(campaign.compras * campaign.ticketMedio).toFixed(2)}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Lucro</div>
            <div className={`text-xl font-bold ${
              (campaign.compras * campaign.ticketMedio - campaign.valorGasto) > 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}>
              R$ {(campaign.compras * campaign.ticketMedio - campaign.valorGasto).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

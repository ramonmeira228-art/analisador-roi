'use client';

import { useState } from 'react';
import { Campaign } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface CampaignFormProps {
  onSubmit: (campaign: Campaign) => void;
  onClose: () => void;
  editCampaign?: Campaign;
}

export function CampaignForm({ onSubmit, onClose, editCampaign }: CampaignFormProps) {
  const [formData, setFormData] = useState<Partial<Campaign>>(
    editCampaign || {
      nome: '',
      objetivo: '',
      orcamentoDiario: 0,
      valorGasto: 0,
      impressoes: 0,
      alcance: 0,
      cliques: 0,
      ctr: 0,
      cpc: 0,
      cpm: 0,
      visualizacoesPagina: 0,
      checkoutIniciado: 0,
      compras: 0,
      cpa: 0,
      ticketMedio: 0,
      roas: 0,
      frequencia: 0,
      tempoCampanha: 0,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const campaign: Campaign = {
      id: editCampaign?.id || Date.now().toString(),
      nome: formData.nome || '',
      objetivo: formData.objetivo || '',
      orcamentoDiario: Number(formData.orcamentoDiario) || 0,
      valorGasto: Number(formData.valorGasto) || 0,
      impressoes: Number(formData.impressoes) || 0,
      alcance: Number(formData.alcance) || 0,
      cliques: Number(formData.cliques) || 0,
      ctr: Number(formData.ctr) || 0,
      cpc: Number(formData.cpc) || 0,
      cpm: Number(formData.cpm) || 0,
      visualizacoesPagina: Number(formData.visualizacoesPagina) || 0,
      checkoutIniciado: Number(formData.checkoutIniciado) || 0,
      compras: Number(formData.compras) || 0,
      cpa: Number(formData.cpa) || 0,
      ticketMedio: Number(formData.ticketMedio) || 0,
      roas: Number(formData.roas) || 0,
      frequencia: Number(formData.frequencia) || 0,
      tempoCampanha: Number(formData.tempoCampanha) || 0,
    };

    onSubmit(campaign);
  };

  const handleChange = (field: keyof Campaign, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            {editCampaign ? 'Editar Campanha' : 'Nova Campanha'}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b pb-2">
                Informações Básicas
              </h3>
            </div>

            <div>
              <Label htmlFor="nome">Nome da Campanha *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
                placeholder="Ex: Campanha Black Friday"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="objetivo">Objetivo *</Label>
              <Input
                id="objetivo"
                value={formData.objetivo}
                onChange={(e) => handleChange('objetivo', e.target.value)}
                placeholder="Ex: Conversões"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="orcamentoDiario">Orçamento Diário (R$)</Label>
              <Input
                id="orcamentoDiario"
                type="number"
                step="0.01"
                value={formData.orcamentoDiario}
                onChange={(e) => handleChange('orcamentoDiario', e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="valorGasto">Valor Gasto (R$)</Label>
              <Input
                id="valorGasto"
                type="number"
                step="0.01"
                value={formData.valorGasto}
                onChange={(e) => handleChange('valorGasto', e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            {/* Métricas de Alcance */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b pb-2">
                Métricas de Alcance
              </h3>
            </div>

            <div>
              <Label htmlFor="impressoes">Impressões</Label>
              <Input
                id="impressoes"
                type="number"
                value={formData.impressoes}
                onChange={(e) => handleChange('impressoes', e.target.value)}
                placeholder="0"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="alcance">Alcance</Label>
              <Input
                id="alcance"
                type="number"
                value={formData.alcance}
                onChange={(e) => handleChange('alcance', e.target.value)}
                placeholder="0"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="frequencia">Frequência</Label>
              <Input
                id="frequencia"
                type="number"
                step="0.01"
                value={formData.frequencia}
                onChange={(e) => handleChange('frequencia', e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="tempoCampanha">Tempo de Campanha (dias)</Label>
              <Input
                id="tempoCampanha"
                type="number"
                value={formData.tempoCampanha}
                onChange={(e) => handleChange('tempoCampanha', e.target.value)}
                placeholder="0"
                className="mt-1"
              />
            </div>

            {/* Métricas de Cliques */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b pb-2">
                Métricas de Cliques
              </h3>
            </div>

            <div>
              <Label htmlFor="cliques">Cliques</Label>
              <Input
                id="cliques"
                type="number"
                value={formData.cliques}
                onChange={(e) => handleChange('cliques', e.target.value)}
                placeholder="0"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="ctr">CTR (%)</Label>
              <Input
                id="ctr"
                type="number"
                step="0.01"
                value={formData.ctr}
                onChange={(e) => handleChange('ctr', e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="cpc">CPC (R$)</Label>
              <Input
                id="cpc"
                type="number"
                step="0.01"
                value={formData.cpc}
                onChange={(e) => handleChange('cpc', e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="cpm">CPM (R$)</Label>
              <Input
                id="cpm"
                type="number"
                step="0.01"
                value={formData.cpm}
                onChange={(e) => handleChange('cpm', e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            {/* Métricas de Conversão */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b pb-2">
                Métricas de Conversão
              </h3>
            </div>

            <div>
              <Label htmlFor="visualizacoesPagina">Visualizações de Página</Label>
              <Input
                id="visualizacoesPagina"
                type="number"
                value={formData.visualizacoesPagina}
                onChange={(e) => handleChange('visualizacoesPagina', e.target.value)}
                placeholder="0"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="checkoutIniciado">Checkout Iniciado</Label>
              <Input
                id="checkoutIniciado"
                type="number"
                value={formData.checkoutIniciado}
                onChange={(e) => handleChange('checkoutIniciado', e.target.value)}
                placeholder="0"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="compras">Compras</Label>
              <Input
                id="compras"
                type="number"
                value={formData.compras}
                onChange={(e) => handleChange('compras', e.target.value)}
                placeholder="0"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="cpa">CPA (R$)</Label>
              <Input
                id="cpa"
                type="number"
                step="0.01"
                value={formData.cpa}
                onChange={(e) => handleChange('cpa', e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            {/* Métricas Financeiras */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b pb-2">
                Métricas Financeiras
              </h3>
            </div>

            <div>
              <Label htmlFor="ticketMedio">Ticket Médio (R$)</Label>
              <Input
                id="ticketMedio"
                type="number"
                step="0.01"
                value={formData.ticketMedio}
                onChange={(e) => handleChange('ticketMedio', e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="roas">ROAS</Label>
              <Input
                id="roas"
                type="number"
                step="0.01"
                value={formData.roas}
                onChange={(e) => handleChange('roas', e.target.value)}
                placeholder="0.00"
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
            >
              {editCampaign ? 'Atualizar' : 'Adicionar'} Campanha
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

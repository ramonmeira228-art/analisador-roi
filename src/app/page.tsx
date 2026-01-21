'use client';

import { useState } from 'react';
import { Campaign } from '@/lib/types';
import { CampaignForm } from '@/components/custom/campaign-form';
import { AnalysisCard } from '@/components/custom/analysis-card';
import { Button } from '@/components/ui/button';
import { Plus, BarChart3, Edit, Trash2, TrendingUp } from 'lucide-react';

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const handleAddCampaign = (campaign: Campaign) => {
    if (editingCampaign) {
      setCampaigns(campaigns.map(c => c.id === campaign.id ? campaign : c));
      setEditingCampaign(undefined);
    } else {
      setCampaigns([...campaigns, campaign]);
    }
    setShowForm(false);
    setSelectedCampaign(campaign);
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setShowForm(true);
  };

  const handleDeleteCampaign = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta campanha?')) {
      setCampaigns(campaigns.filter(c => c.id !== id));
      if (selectedCampaign?.id === id) {
        setSelectedCampaign(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl">
                <BarChart3 className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Analisador ROIcheck
                </h1>
                <p className="text-blue-100 mt-1 text-sm md:text-base">
                  Analisador especialista em low ticket
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                setEditingCampaign(undefined);
                setShowForm(true);
              }}
              className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Campanha
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {campaigns.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-12 max-w-2xl mx-auto">
              <TrendingUp className="w-20 h-20 text-blue-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Bem-vindo ao Analisador ROIcheck
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                Comece adicionando sua primeira campanha para receber análises detalhadas e
                recomendações personalizadas para otimizar seus resultados em produtos low ticket.
              </p>
              <Button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-lg px-8 py-6"
              >
                <Plus className="w-6 h-6 mr-2" />
                Adicionar Primeira Campanha
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lista de Campanhas */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Campanhas ({campaigns.length})
                </h2>
                <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto">
                  {campaigns.map((campaign) => (
                    <div
                      key={campaign.id}
                      className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedCampaign?.id === campaign.id
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/20'
                          : 'border-gray-200 dark:border-gray-800 hover:border-blue-400'
                      }`}
                      onClick={() => setSelectedCampaign(campaign)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                          {campaign.nome}
                        </h3>
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditCampaign(campaign);
                            }}
                            className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCampaign(campaign.id);
                            }}
                            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        <div className="flex justify-between">
                          <span>ROAS:</span>
                          <span className="font-semibold">{campaign.roas.toFixed(2)}x</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Gasto:</span>
                          <span className="font-semibold">R$ {campaign.valorGasto.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Compras:</span>
                          <span className="font-semibold">{campaign.compras}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Área de Análise */}
            <div className="lg:col-span-2">
              {selectedCampaign ? (
                <AnalysisCard campaign={selectedCampaign} />
              ) : (
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-12 text-center">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Selecione uma campanha
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Clique em uma campanha na lista ao lado para ver a análise detalhada
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modal de Formulário */}
      {showForm && (
        <CampaignForm
          onSubmit={handleAddCampaign}
          onClose={() => {
            setShowForm(false);
            setEditingCampaign(undefined);
          }}
          editCampaign={editingCampaign}
        />
      )}
    </div>
  );
}

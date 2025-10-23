import React, { useState, useEffect } from 'react';
import TradingChart from '../components/TradingChart';
import ActionButtons from '../components/ActionButtons';
import StatsPanel from '../components/StatsPanel';
import { simulateTrading } from '../api/tradingApi'; // Corriger le nom du fichier
import { Activity, TrendingUp, DollarSign } from 'lucide-react';

const Dashboard = () => {
  const [lastDecision, setLastDecision] = useState(null);
  const [stats, setStats] = useState({
    totalPnL: 0,
    sharpeRatio: 0,
    winRate: 0,
    totalTrades: 0
  });
  const [currentPrice, setCurrentPrice] = useState(0);

  // Gestion des actions de trading
  const handleTradingAction = async (action) => {
    try {
      if (!currentPrice) {
        console.error('❌ No current price available');
        return;
      }

      console.log(`🎯 User action: ${action} at price $${currentPrice}`);
      const decision = await simulateTrading(currentPrice);
      
      setLastDecision({
        ...decision,
        userAction: action,
        timestamp: new Date().toISOString()
      });

      // Mise à jour des statistiques simulées
      updateStats(decision);
      
      console.log(`🎯 User action: ${action}, AI decision:`, decision);
    } catch (error) {
      console.error('❌ Error simulating decision:', error);
    }
  };

  const updateStats = (decision) => {
    setStats(prev => ({
      totalPnL: prev.totalPnL + (decision.expectedReturn || 0),
      sharpeRatio: Math.random() * 2 - 0.5, // Simulé
      winRate: Math.random() * 100, // Simulé
      totalTrades: prev.totalTrades + 1
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center">
            <TrendingUp className="mr-3 text-yellow-500" />
            BTC Trader Vision - VRAIES DONNÉES (Binance/Kraken/Coinbase)
          </h1>
          <div className="mt-2 flex items-center space-x-4">
            <div className="flex items-center">
              <DollarSign className="mr-1 text-green-500" />
              <span className="text-2xl font-mono">${currentPrice.toLocaleString()}</span>
            </div>
            <div className="text-sm text-gray-400">
              Source: APIs publiques gratuites (PAS COINGECKO)
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        
        {/* Chart Section - NOUVEAU TradingChart */}
        <div className="bg-gray-800 rounded-lg p-6">
          <TradingChart onPriceUpdate={setCurrentPrice} />
        </div>

        {/* Action & Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Action Buttons */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Actions de Trading</h2>
            <ActionButtons 
              onAction={handleTradingAction}
              disabled={!currentPrice}
              currentPrice={currentPrice}
            />
            
            {/* Last Decision Display */}
            {lastDecision && (
              <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2">Dernière Décision IA</h3>
                <div className="space-y-2 text-sm">
                  <div>Action recommandée: <span className="font-mono text-yellow-500">{lastDecision.action}</span></div>
                  <div>Votre action: <span className="font-mono text-blue-500">{lastDecision.userAction}</span></div>
                  <div>Confiance: <span className="font-mono">{lastDecision.confidence}%</span></div>
                  <div>Retour attendu: <span className="font-mono">{lastDecision.expectedReturn}%</span></div>
                  <div className="text-xs text-gray-400">{lastDecision.reasoning}</div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Panel */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
            <StatsPanel stats={stats} />
            
            {/* Info sur les données */}
            <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
              <div className="text-sm text-green-400">
                <div className="font-semibold mb-1">✅ Sources de données RÉELLES:</div>
                <div>• Binance API (principal)</div>
                <div>• Kraken API (fallback 1)</div>
                <div>• Coinbase Pro API (fallback 2)</div>
                <div className="text-xs mt-2 text-green-300">
                  Toutes les APIs sont 100% gratuites et publiques
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

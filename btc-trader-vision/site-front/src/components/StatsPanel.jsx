import React from 'react';
import { DollarSign, TrendingUp, Target, Activity } from 'lucide-react';

const StatsPanel = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* PnL Total */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-400">PnL Total</div>
            <div className={`text-lg font-mono font-bold ${stats.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {stats.totalPnL >= 0 ? '+' : ''}{stats.totalPnL.toFixed(2)}%
            </div>
          </div>
          <DollarSign className="text-green-400" size={24} />
        </div>
      </div>

      {/* Sharpe Ratio */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-400">Sharpe Ratio</div>
            <div className="text-lg font-mono font-bold text-blue-400">
              {stats.sharpeRatio.toFixed(3)}
            </div>
          </div>
          <TrendingUp className="text-blue-400" size={24} />
        </div>
      </div>

      {/* Taux de Succès */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-400">Taux de Succès</div>
            <div className="text-lg font-mono font-bold text-yellow-400">
              {stats.winRate.toFixed(1)}%
            </div>
          </div>
          <Target className="text-yellow-400" size={24} />
        </div>
      </div>

      {/* Total Trades */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-400">Total Trades</div>
            <div className="text-lg font-mono font-bold text-purple-400">
              {stats.totalTrades}
            </div>
          </div>
          <Activity className="text-purple-400" size={24} />
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;

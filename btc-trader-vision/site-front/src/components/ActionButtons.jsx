import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const ActionButtons = ({ onAction, disabled, currentPrice }) => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-400 mb-4">
        Prix actuel: ${currentPrice ? currentPrice.toLocaleString() : '---'}
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Bouton Acheter */}
        <button
          onClick={() => onAction('Buy')}
          disabled={disabled}
          className="flex flex-col items-center p-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
        >
          <TrendingUp size={24} className="mb-2" />
          <span className="font-semibold">Acheter</span>
        </button>

        {/* Bouton Conserver */}
        <button
          onClick={() => onAction('Hold')}
          disabled={disabled}
          className="flex flex-col items-center p-4 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
        >
          <Minus size={24} className="mb-2" />
          <span className="font-semibold">Conserver</span>
        </button>

        {/* Bouton Vendre */}
        <button
          onClick={() => onAction('Sell')}
          disabled={disabled}
          className="flex flex-col items-center p-4 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
        >
          <TrendingDown size={24} className="mb-2" />
          <span className="font-semibold">Vendre</span>
        </button>
      </div>

      {disabled && (
        <div className="text-xs text-center text-gray-500 mt-2">
          En attente des données de prix...
        </div>
      )}
    </div>
  );
};

export default ActionButtons;

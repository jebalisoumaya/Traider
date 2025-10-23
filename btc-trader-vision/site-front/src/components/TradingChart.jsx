import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock, Activity, RefreshCw } from 'lucide-react';
import { fetchBTCPrices, fetchLatestBTCPrice } from '../api/tradingApi';

const TradingChart = ({ onPriceUpdate }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [realtime, setRealtime] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Charger les données RÉELLES (Binance/Kraken/Coinbase - PAS COINGECKO)
  const loadData = async (isRealtime = false) => {
    try {
      setLoading(true);
      console.log(`🔄 Loading REAL BTC data (${isRealtime ? 'realtime' : 'historical'}) from Binance/Kraken/Coinbase (NOT COINGECKO)...`);
      
      const btcData = await fetchBTCPrices(isRealtime);
      setData(btcData);
      setLastUpdate(new Date());
      
      // Mettre à jour le prix dans le Dashboard
      if (btcData.length > 0 && onPriceUpdate) {
        onPriceUpdate(btcData[btcData.length - 1].price);
      }
      
      console.log(`✅ Loaded ${btcData.length} REAL BTC price points from Binance/Kraken/Coinbase (NOT COINGECKO)`);
    } catch (error) {
      console.error('❌ Failed to load REAL BTC data from Binance/Kraken/Coinbase (NOT COINGECKO):', error);
    } finally {
      setLoading(false);
    }
  };

  // Polling pour mode temps réel avec VRAIES données (Binance - PAS COINGECKO)
  useEffect(() => {
    let interval;
    
    if (realtime) {
      interval = setInterval(async () => {
        try {
          console.log('🔄 Updating with latest REAL BTC price from Binance (NOT COINGECKO)...');
          const latestPoint = await fetchLatestBTCPrice();
          setData(prevData => {
            const newData = [...prevData.slice(1), latestPoint]; // Shift + push
            return newData;
          });
          setLastUpdate(new Date());
          
          // Mettre à jour le prix dans le Dashboard
          if (onPriceUpdate) {
            onPriceUpdate(latestPoint.price);
          }
          
          console.log(`✅ Updated with latest REAL price: $${latestPoint.price} from Binance (NOT COINGECKO)`);
        } catch (error) {
          console.error('❌ Failed to fetch latest REAL price from Binance (NOT COINGECKO):', error);
        }
      }, 30000); // Toutes les 30 secondes
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [realtime, onPriceUpdate]);

  // Chargement initial
  useEffect(() => {
    loadData(realtime);
  }, [realtime]);

  // Formattage du temps pour l'axe X
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  // Formattage du prix pour les tooltips et l'axe Y
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header avec contrôles */}
      <div className="flex justify-between items-center mb-6 p-6 pb-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-800">Bitcoin (BTC/USD) - VRAIES DONNÉES</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock size={16} />
            <span>Dernière maj: {lastUpdate.toLocaleTimeString()}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Toggle temps réel */}
          <button
            onClick={() => setRealtime(!realtime)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              realtime 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : 'bg-gray-100 text-gray-700 border border-gray-300'
            }`}
          >
            <Activity size={16} />
            <span>{realtime ? 'Temps réel (Binance)' : 'Historique (Binance/Kraken/Coinbase)'}</span>
          </button>
          
          {/* Bouton refresh */}
          <button
            onClick={() => loadData(realtime)}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            <span>Actualiser</span>
          </button>
        </div>
      </div>

      {/* Graphique */}
      <div className="h-96 px-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Chargement des VRAIES données BTC (Binance/Kraken/Coinbase - NOT COINGECKO)...</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp"
                tickFormatter={formatTime}
                type="number"
                scale="time"
                domain={['dataMin', 'dataMax']}
              />
              <YAxis 
                tickFormatter={formatPrice}
                domain={['dataMin - 500', 'dataMax + 500']}
              />
              <Tooltip 
                labelFormatter={formatTime}
                formatter={(value) => [formatPrice(value), 'Prix BTC RÉEL (Binance/Kraken/Coinbase)']}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke={realtime ? "#10b981" : "#3b82f6"}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Info du dataset */}
      <div className="mt-4 p-6 pt-0 text-sm text-gray-600 flex justify-between">
        <span>Points: {data.length} (VRAIES DONNÉES: Binance/Kraken/Coinbase - NOT COINGECKO)</span>
        <span>Mode: {realtime ? 'Temps réel (1min)' : 'Historique (1h)'}</span>
        {data.length > 0 && (
          <span>Prix actuel RÉEL: {formatPrice(data[data.length - 1]?.price)}</span>
        )}
      </div>
    </div>
  );
};

export default TradingChart;
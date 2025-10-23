import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartBTC = ({ data }) => {
  // Formatage des données pour Recharts
  const chartData = data.map(item => ({
    ...item,
    time: new Date(item.timestamp).toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    })
  }));

  // Tooltip personnalisé
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-700 p-3 rounded border border-gray-600">
          <p className="text-white font-semibold">{`Heure: ${label}`}</p>
          <p className="text-yellow-500">{`Prix: $${data.price.toLocaleString()}`}</p>
          <p className="text-blue-400">{`Volume: ${(data.volume / 1000000).toFixed(1)}M`}</p>
          <p className="text-green-400">{`Haut: $${data.high.toLocaleString()}`}</p>
          <p className="text-red-400">{`Bas: $${data.low.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-gray-400">
        Aucune donnée à afficher
      </div>
    );
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="time" 
            stroke="#9CA3AF"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            stroke="#9CA3AF"
            tick={{ fontSize: 12 }}
            domain={['dataMin - 1000', 'dataMax + 1000']}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#F59E0B" 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, stroke: '#F59E0B', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartBTC;

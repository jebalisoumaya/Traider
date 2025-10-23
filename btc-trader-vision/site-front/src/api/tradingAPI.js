import axios from 'axios';

// Configuration de base pour axios
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour les logs
api.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Fonctions API

/**
 * Récupère les données de prix BTC des 100 dernières heures
 * @returns {Promise<Array>} Tableau des données de prix
 */
export const getBTCPrices = async () => {
  try {
    const response = await api.get('/prices');
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error('Failed to fetch BTC prices');
    }
  } catch (error) {
    console.error('Error fetching BTC prices:', error);
    throw error;
  }
};

/**
 * Simule une décision de trading
 * @param {Object} params - Paramètres pour la simulation
 * @param {number} params.currentPrice - Prix actuel du BTC
 * @returns {Promise<Object>} Décision simulée
 */
export const simulateDecision = async ({ currentPrice }) => {
  try {
    const response = await api.post('/simulate', {
      currentPrice
    });
    
    if (response.data.success) {
      return response.data.decision;
    } else {
      throw new Error('Failed to simulate decision');
    }
  } catch (error) {
    console.error('Error simulating decision:', error);
    throw error;
  }
};

/**
 * Prédiction IA (placeholder pour plus tard)
 * @param {Object} params - Paramètres pour la prédiction
 * @returns {Promise<Object>} Prédiction IA
 */
export const getPrediction = async (params) => {
  try {
    const response = await api.post('/predict', params);
    
    if (response.data.success) {
      return response.data.prediction;
    } else {
      throw new Error(response.data.message || 'AI prediction not available');
    }
  } catch (error) {
    console.error('Error getting AI prediction:', error);
    throw error;
  }
};

/**
 * Récupérer les prix BTC réels
 * @param {boolean} realtime - Indique si la récupération doit être en temps réel
 * @returns {Promise<Object>} Données des prix BTC
 */
export const fetchBTCPrices = async (realtime = false) => {
  try {
    console.log(`🔄 Fetching REAL BTC data (${realtime ? 'realtime' : 'historical'}) from backend (Binance/Kraken/Coinbase - NOT COINGECKO)...`);
    
    const response = await api.get('/prices', {
      params: { realtime: realtime ? 'true' : 'false' }
    });
    
    console.log(`✅ Received ${response.data.length} REAL BTC price points (SOURCE: Binance/Kraken/Coinbase - NOT COINGECKO)`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching REAL BTC prices (backend uses Binance/Kraken/Coinbase - NOT COINGECKO):', error);
    throw error;
  }
};

/**
 * Récupérer le dernier prix BTC en temps réel
 * @returns {Promise<Object>} Dernier prix BTC
 */
export const fetchLatestBTCPrice = async () => {
  try {
    console.log('🔄 Fetching latest REAL BTC price from backend (Binance - NOT COINGECKO)...');
    
    const response = await api.get('/latest');
    
    console.log(`✅ Received latest REAL BTC price: $${response.data.price} (SOURCE: Binance - NOT COINGECKO)`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching latest REAL BTC price (backend uses Binance - NOT COINGECKO):', error);
    throw error;
  }
};

export default api;

const yfinanceService = require('../services/yfinanceService');

// Récupération des prix BTC
const getBTCPrices = async (req, res) => {
  try {
    console.log('📊 Fetching BTC prices...');
    const pricesData = await yfinanceService.fetchBTCPrices();
    
    res.json({
      success: true,
      data: pricesData,
      timestamp: new Date().toISOString()
    });
    
    console.log(`✅ Sent ${pricesData.length} BTC price points`);
  } catch (error) {
    console.error('❌ Error fetching BTC prices:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch BTC prices',
      message: error.message
    });
  }
};

// Simulation d'une décision de trading (placeholder IA)
const simulateDecision = async (req, res) => {
  try {
    const { currentPrice } = req.body;
    
    // Simulation aléatoire d'une décision
    const actions = ['Buy', 'Sell', 'Hold'];
    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    
    // Calcul de statistiques simulées
    const confidence = Math.random() * 0.4 + 0.6; // 60-100%
    const expectedReturn = (Math.random() - 0.5) * 0.1; // -5% à +5%
    
    const decision = {
      action: randomAction,
      confidence: Math.round(confidence * 100),
      expectedReturn: Math.round(expectedReturn * 10000) / 100,
      reasoning: `Décision basée sur l'analyse technique simulée`,
      timestamp: new Date().toISOString(),
      currentPrice: currentPrice || null
    };
    
    console.log(`🎯 Simulated decision: ${randomAction} (${decision.confidence}% confidence)`);
    
    res.json({
      success: true,
      decision: decision
    });
    
  } catch (error) {
    console.error('❌ Error simulating decision:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to simulate decision',
      message: error.message
    });
  }
};

// Prédiction IA (placeholder pour plus tard)
const predictDecision = async (req, res) => {
  try {
    res.json({
      success: false,
      message: '🤖 AI prediction endpoint not implemented yet. Coming soon with TensorFlow integration!',
      placeholder: true
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'AI prediction service unavailable',
      message: error.message
    });
  }
};

module.exports = {
  getBTCPrices,
  simulateDecision,
  predictDecision
};

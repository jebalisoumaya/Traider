const express = require('express');
const { fetchBTCPrices, fetchLatestBTCPrice } = require('../services/yfinanceService');

const router = express.Router();

// GET /api/prices - Récupérer les prix BTC RÉELS (Binance/Kraken/Coinbase - PAS DE COINGECKO)
router.get('/prices', async (req, res) => {
  try {
    const realtime = req.query.realtime === 'true';
    console.log(`📊 Fetching REAL BTC prices (${realtime ? 'realtime' : 'historical'}) - NO COINGECKO!`);
    
    const options = { realtime };
    const data = await fetchBTCPrices(options);
    
    if (!data || data.length === 0) {
      return res.status(500).json({ 
        error: 'No BTC data available',
        message: 'All real APIs failed (Binance, Kraken, Coinbase)'
      });
    }

    console.log(`✅ Sent ${data.length} REAL BTC price points (SOURCE: Binance/Kraken/Coinbase - NOT COINGECKO)`);
    res.json(data);
    
  } catch (error) {
    console.error('❌ Error in /prices route:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch BTC prices',
      message: error.message 
    });
  }
});

// GET /api/latest - Prix BTC actuel RÉEL (PAS DE COINGECKO)
router.get('/latest', async (req, res) => {
  try {
    console.log('📊 Fetching latest REAL BTC price (SOURCE: Binance - NOT COINGECKO)...');
    
    const latestPrice = await fetchLatestBTCPrice();
    
    console.log(`✅ Sent latest REAL BTC price: $${latestPrice.price} (SOURCE: Binance - NOT COINGECKO)`);
    res.json(latestPrice);
    
  } catch (error) {
    console.error('❌ Error in /latest route:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch latest BTC price',
      message: error.message 
    });
  }
});

// POST /api/simulate - Simuler une décision de trading
router.post('/simulate', async (req, res) => {
  try {
    const { currentPrice } = req.body;
    
    if (!currentPrice || typeof currentPrice !== 'number') {
      return res.status(400).json({ error: 'Valid currentPrice is required' });
    }

    // Simulation de décision basée sur des niveaux techniques réels
    let action, confidence, reasoning;
    
    if (currentPrice < 65000) {
      action = 'Buy';
      confidence = 75 + Math.random() * 20;
      reasoning = `Prix en zone d'achat sous $65k. Support technique identifié.`;
    } else if (currentPrice > 72000) {
      action = 'Sell';
      confidence = 70 + Math.random() * 25;
      reasoning = `Prix en zone de résistance au-dessus de $72k. Prise de profits.`;
    } else {
      const actions = ['Buy', 'Sell', 'Hold'];
      action = actions[Math.floor(Math.random() * actions.length)];
      confidence = 60 + Math.random() * 25;
      reasoning = `Prix en zone neutre ($65k-$72k). Signal ${action.toLowerCase()} modéré.`;
    }

    const expectedReturn = (Math.random() - 0.5) * 6; // ±3%
    
    const decision = {
      action,
      confidence: Math.round(confidence * 100) / 100,
      expectedReturn: Math.round(expectedReturn * 100) / 100,
      reasoning,
      timestamp: new Date().toISOString(),
      currentPrice
    };

    console.log(`🎯 Simulated decision: ${action} (${confidence.toFixed(1)}% confidence)`);
    res.json(decision);
    
  } catch (error) {
    console.error('❌ Error in /simulate route:', error.message);
    res.status(500).json({ 
      error: 'Failed to simulate trading decision',
      message: error.message 
    });
  }
});

module.exports = router;

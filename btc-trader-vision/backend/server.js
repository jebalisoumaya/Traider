const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const tradingRoutes = require('./routes/trading');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use('/api', tradingRoutes);

// Route de base
app.get('/', (req, res) => {
  res.json({ message: '🚀 BTC Trader Vision API is running!' });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});

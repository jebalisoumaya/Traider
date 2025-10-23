# 🚀 BTC Trader Vision

Une application complète de trading Bitcoin avec interface web moderne et simulation d'IA.

## 📋 Description

BTC Trader Vision est une plateforme de trading qui affiche les données BTC-USD en temps réel et simule des décisions de trading intelligent. L'application est prête à intégrer de vrais modèles d'IA (TensorFlow, LSTM, DARQN) dans le futur.

## 🏗️ Architecture

```
btc-trader-vision/
├── backend/              # API Node.js + Express
│   ├── server.js         # Serveur principal
│   ├── routes/           # Définition des routes API
│   ├── controllers/      # Logique métier
│   ├── services/         # Services externes (APIs)
│   └── package.json      # Dépendances backend
└── frontend/             # Application React
    ├── src/
    │   ├── components/   # Composants réutilisables
    │   ├── pages/        # Pages de l'application
    │   └── api/          # Services API frontend
    └── package.json      # Dépendances frontend
```

## 🛠️ Technologies Utilisées

### Backend
- **Node.js** + **Express.js** - Serveur API REST
- **Axios** - Requêtes HTTP vers APIs externes
- **CORS** - Gestion des requêtes cross-origin
- **Morgan** - Logging des requêtes
- **dotenv** - Variables d'environnement

### Frontend
- **React.js** + **Vite** - Interface utilisateur moderne  
- **TailwindCSS** - Framework CSS utilitaire
- **Recharts** - Graphiques et visualisations
- **Lucide React** - Icônes
- **React Router** - Navigation
- **Axios** - Client HTTP

## 🚀 Installation et Lancement

### Prérequis
- Node.js (version 16+)
- npm ou yarn

### 1. Cloner le projet
```bash
cd c:\Users\Admin\Documents\IPSSI\Tp\Groupe\Traider
# Le projet est déjà présent dans btc-trader-vision/
```

### 2. Installation Backend
```bash
cd btc-trader-vision/backend
npm install
```

### 3. Installation Frontend  
```bash
cd ../frontend
npm install
```

### 4. Lancement en développement

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Serveur disponible sur http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash  
cd frontend
npm run dev
# Application disponible sur http://localhost:3000
```

## 📡 API Endpoints

### Backend disponible sur `http://localhost:5000/api`

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/prices` | Récupère les 100 dernières heures BTC-USD |
| POST | `/api/simulate` | Simule une décision de trading |
| POST | `/api/predict` | 🔮 Prédiction IA (placeholder) |

### Exemple d'utilisation

```javascript
// Récupérer les prix BTC
const response = await fetch('http://localhost:5000/api/prices');
const data = await response.json();

// Simuler une décision
const decision = await fetch('http://localhost:5000/api/simulate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ currentPrice: 45000 })
});
```

## 🎯 Fonctionnalités Actuelles

### ✅ Implémentées
- 📊 **Graphique BTC-USD** en temps réel (100 dernières heures)
- 🎮 **Boutons d'action** : Acheter, Vendre, Conserver  
- 🤖 **Simulation IA** : Décisions aléatoires avec confiance et retour attendu
- 📈 **Statistiques** : PnL, Sharpe ratio, taux de succès
- 🔄 **Actualisation** automatique des données
- 📱 **Interface responsive** avec TailwindCSS

### 🚧 À Venir (préparé)
- 🧠 **Intégration IA réelle** : TensorFlow.js, modèles DARQN/LSTM
- 💾 **Base de données** : Historique des trades
- 📊 **Analytics avancés** : Plus de métriques
- ⚡ **WebSockets** : Données temps réel
- 🔐 **Authentification** : Comptes utilisateurs

## 🔧 Configuration

### Variables d'environnement Backend (`.env`)
```env
PORT=5000
NODE_ENV=development
# Futures clés API...
```

### Variables d'environnement Frontend (`.env.local`)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📊 Structure des Données

### Format des données BTC
```javascript
{
  timestamp: 1699123456789,
  date: "2023-11-04T12:30:45.000Z", 
  price: 34567.89,
  volume: 1234567890,
  marketCap: 675432109876,
  open: 34500.12,
  high: 34650.33, 
  low: 34450.77,
  close: 34567.89
}
```

### Format des décisions simulées
```javascript
{
  action: "Buy|Sell|Hold",
  confidence: 87, // %
  expectedReturn: 2.34, // %
  reasoning: "Analyse technique...",
  timestamp: "2023-11-04T12:30:45.000Z",
  currentPrice: 34567.89
}
```

## 🐛 Debugging

### Logs Backend
Les logs sont affichés dans la console avec Morgan:
```
📊 Fetching BTC prices...
✅ Sent 100 BTC price points
🎯 Simulated decision: Buy (87% confidence)
```

### Logs Frontend  
Ouvrir les DevTools du navigateur (F12) pour voir les logs:
```javascript
console.log('📊 Loaded BTC data:', data.length, 'points');
console.log('🎯 User action: Buy, AI decision:', decision);
```

## 🚀 Déploiement Production

### Backend (Heroku, Railway, etc.)
```bash
cd backend
npm run build  # Si build process
npm start
```

### Frontend (Vercel, Netlify, etc.)
```bash
cd frontend  
npm run build
# Deploy le dossier 'dist/'
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème:
- 📧 Email: support@btc-trader-vision.com
- 💬 Discord: [Serveur du projet]
- 📱 Issues: Utiliser le système d'issues GitHub

---

**🔮 Prochaines étapes :** Intégration des modèles TensorFlow pour de vraies prédictions IA !

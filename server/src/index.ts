import express from 'express';

// Port sur lequel le serveur écoute : http://localhost:3000
const PORT = 3000;

// `app` représente notre serveur : on y déclare les routes, puis on le démarre.
const app = express();

// Route de santé : permet de vérifier que le serveur répond.
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', date: new Date().toISOString() });
});

// Démarre le serveur : à partir d'ici, le programme reste en vie et attend les requêtes.
app.listen(PORT, (error) => {
  // Express 5 signale ici un échec au démarrage, par exemple un port déjà occupé.
  if (error) {
    throw error;
  }
  console.log(`Serveur Job Radar démarré sur http://localhost:${PORT}`);
});

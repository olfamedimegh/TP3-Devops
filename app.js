const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World depuis Kubernetes et Helm 🚀');
});

app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});

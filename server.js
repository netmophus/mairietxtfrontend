const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Servir les fichiers statiques du build React
app.use(express.static(path.join(__dirname, 'build')));

// Rediriger toutes les routes vers index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});

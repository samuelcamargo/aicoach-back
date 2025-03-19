// Arquivo index.js na raiz do projeto
// Serve como ponto de entrada alternativo para a Vercel

const express = require('express');
const app = express();

// Tente importar o app compilado
let mainApp;
try {
  mainApp = require('./dist/index.js');
  // Se importou com sucesso, usa o app principal
  module.exports = mainApp;
} catch (error) {
  console.error('Erro ao importar o app principal:', error);
  
  // Configura uma resposta básica para todas as rotas
  app.use((req, res) => {
    res.status(500).json({
      error: 'Aplicação em manutenção',
      message: 'O servidor está temporariamente indisponível. Tente novamente mais tarde.'
    });
  });
  
  // Exporta o app de fallback
  module.exports = app;
} 
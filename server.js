// Este arquivo serve como um ponto de entrada simplificado para o Vercel

// Importar diretamente o Express app usando require
let app;

try {
  app = require('./dist/index.js');
} catch (error) {
  console.error('Erro ao importar aplicação:', error);
  
  // Fornece um app de fallback para evitar falha catastrófica
  const express = require('express');
  app = express();
  
  app.get('*', (req, res) => {
    res.status(500).json({ 
      error: 'Erro na inicialização da aplicação',
      details: error.message,
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  });
}

// Exportando o handler para Vercel
module.exports = app; 
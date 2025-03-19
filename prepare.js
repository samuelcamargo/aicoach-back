// Script para garantir que o projeto está pronto para build na Vercel
const fs = require('fs');
const path = require('path');

console.log('Iniciando preparação para build na Vercel...');

// Verificar se há variáveis de ambiente necessárias
console.log('Verificando variáveis de ambiente...');
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingVars = requiredEnvVars.filter(env => !process.env[env]);

if (missingVars.length > 0) {
  console.warn(`⚠️ Variáveis de ambiente ausentes: ${missingVars.join(', ')}`);
  console.log('Criando valores temporários para build...');
  
  // Criar arquivo .env temporário se não existir
  if (!fs.existsSync('.env')) {
    console.log('Criando arquivo .env temporário...');
    fs.writeFileSync('.env', 
      `NODE_ENV=production\n` +
      `MONGODB_URI=${process.env.MONGO_URI || 'mongodb://placeholder'}\n` +
      `JWT_SECRET=${process.env.JWT_SECRET || 'temporary-secret-for-build'}\n` +
      `JWT_EXPIRES_IN=7d\n` +
      `PORT=3000\n`
    );
  }
}

console.log('Preparação concluída. Pronto para build.'); 
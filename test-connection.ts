import { connectDB, disconnectDB } from './src/infra/database/mongodb/connection';

console.log('Iniciando teste de conexão com MongoDB...');

connectDB()
  .then(() => {
    console.log('✅ Conexão com MongoDB estabelecida com sucesso!');
    console.log('📊 Conectado ao banco de dados aicoach.');
    
    return disconnectDB();
  })
  .then(() => {
    console.log('Conexão fechada.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar com MongoDB:', error);
    process.exit(1);
  }); 
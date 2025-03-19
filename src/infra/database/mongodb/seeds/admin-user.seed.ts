import { config } from 'dotenv';
import { connectDB, disconnectDB } from '../connection';
import { BcryptAdapter } from '../../../cryptography/bcrypt-adapter';
import { MongoUserRepository } from '../repositories/user.repository';
import { AccessLevel } from '../../../../domain/entities/user.entity';

// Carrega as variáveis de ambiente
config();

// Configurações
const ADMIN_USER = {
  name: 'samuel',
  email: 'samuel@samuel.com',
  phone: 'Não informado', // Como o campo é obrigatório no modelo, estou colocando um valor padrão
  login: 'samuel',
  password: '123456',
  accessLevel: AccessLevel.ADMIN
};

// Função principal para executar a seed
async function seedAdminUser(): Promise<void> {
  console.log('🌱 Iniciando seed do usuário administrador...');
  
  try {
    // Conectar ao banco de dados
    await connectDB();
    console.log('✅ Conectado ao MongoDB');
    
    // Criar as instâncias necessárias
    const bcryptAdapter = new BcryptAdapter(12);
    const userRepository = new MongoUserRepository();
    
    // Verificar se já existe um usuário com o mesmo login
    const existingUser = await userRepository.findByLogin(ADMIN_USER.login);
    
    if (existingUser) {
      console.log('⚠️ Um usuário com o login "samuel" já existe. Pulando criação.');
    } else {
      // Criptografar a senha
      const hashedPassword = await bcryptAdapter.hash(ADMIN_USER.password);
      
      // Criar o usuário admin
      const user = await userRepository.create({
        ...ADMIN_USER,
        password: hashedPassword
      });
      
      console.log('✅ Usuário administrador criado com sucesso!');
      console.log('📝 Detalhes do usuário:');
      console.log(`   Nome: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Login: ${user.login}`);
      console.log(`   Nível de acesso: ${user.accessLevel}`);
      console.log(`   ID: ${user.id}`);
    }
    
    // Desconectar do banco de dados
    await disconnectDB();
    console.log('👋 Conexão com MongoDB encerrada');
    
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error);
  } finally {
    process.exit(0);
  }
}

// Executar a seed
seedAdminUser(); 
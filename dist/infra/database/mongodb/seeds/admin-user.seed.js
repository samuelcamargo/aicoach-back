"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const connection_1 = require("../connection");
const bcrypt_adapter_1 = require("../../../cryptography/bcrypt-adapter");
const user_repository_1 = require("../repositories/user.repository");
const user_entity_1 = require("../../../../domain/entities/user.entity");
// Carrega as variáveis de ambiente
(0, dotenv_1.config)();
// Configurações
const ADMIN_USER = {
    name: 'samuel',
    email: 'samuel@samuel.com',
    phone: 'Não informado', // Como o campo é obrigatório no modelo, estou colocando um valor padrão
    login: 'samuel',
    password: '123456',
    accessLevel: user_entity_1.AccessLevel.ADMIN
};
// Função principal para executar a seed
function seedAdminUser() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🌱 Iniciando seed do usuário administrador...');
        try {
            // Conectar ao banco de dados
            yield (0, connection_1.connectDB)();
            console.log('✅ Conectado ao MongoDB');
            // Criar as instâncias necessárias
            const bcryptAdapter = new bcrypt_adapter_1.BcryptAdapter(12);
            const userRepository = new user_repository_1.MongoUserRepository();
            // Verificar se já existe um usuário com o mesmo login
            const existingUser = yield userRepository.findByLogin(ADMIN_USER.login);
            if (existingUser) {
                console.log('⚠️ Um usuário com o login "samuel" já existe. Pulando criação.');
            }
            else {
                // Criptografar a senha
                const hashedPassword = yield bcryptAdapter.hash(ADMIN_USER.password);
                // Criar o usuário admin
                const user = yield userRepository.create(Object.assign(Object.assign({}, ADMIN_USER), { password: hashedPassword }));
                console.log('✅ Usuário administrador criado com sucesso!');
                console.log('📝 Detalhes do usuário:');
                console.log(`   Nome: ${user.name}`);
                console.log(`   Email: ${user.email}`);
                console.log(`   Login: ${user.login}`);
                console.log(`   Nível de acesso: ${user.accessLevel}`);
                console.log(`   ID: ${user.id}`);
            }
            // Desconectar do banco de dados
            yield (0, connection_1.disconnectDB)();
            console.log('👋 Conexão com MongoDB encerrada');
        }
        catch (error) {
            console.error('❌ Erro ao executar seed:', error);
        }
        finally {
            process.exit(0);
        }
    });
}
// Executar a seed
seedAdminUser();

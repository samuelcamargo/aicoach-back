# aiCoach - API Backend

API Backend para o sistema aiCoach desenvolvido com Node.js, Express, TypeScript e MongoDB seguindo os princípios do Clean Architecture e SOLID.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução
- **Express**: Framework web
- **TypeScript**: Linguagem de programação com tipagem estática
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticação baseada em tokens
- **Bcrypt**: Criptografia de senhas
- **Swagger**: Documentação da API
- **Jest**: Framework de testes
- **ESLint**: Linting de código para padrões de qualidade

## Estrutura do Projeto (Clean Architecture)

O projeto segue uma arquitetura limpa (Clean Architecture) com as seguintes camadas:

- **Domain**: Contém as regras de negócio e entidades do sistema
  - Entities: Definições de entidades
  - Repositories (interfaces): Contratos para acesso a dados
  - UseCases: Regras de negócio da aplicação

- **Presentation**: Componentes relacionados à apresentação
  - Controllers: Processam requisições e retornam respostas
  - Middlewares: Interceptadores de requisições

- **Infra**: Implementações técnicas e acesso a recursos externos
  - Database: Implementações concretas de repositories
  - Cryptography: Serviços de criptografia e autenticação

- **Main**: Configuração e inicialização da aplicação
  - Factories: Fábricas para instanciação de componentes
  - Routes: Definição das rotas da API
  - Config: Configurações da aplicação
  - Swagger: Documentação da API

## Níveis de Acesso

O sistema possui três níveis de acesso diferentes:

- **admin**: Acesso administrativo com todas as permissões
- **user**: Acesso padrão para usuários regulares
- **cliente**: Acesso específico para clientes do sistema

## Endpoints Principais

### Autenticação
- `POST /api/auth`: Autentica usuário e retorna token JWT

### Usuários
- `GET /api/users`: Lista todos os usuários
- `GET /api/users/:id`: Obtém usuário por ID
- `POST /api/users`: Cria novo usuário
- `PUT /api/users/:id`: Atualiza usuário existente
- `DELETE /api/users/:id`: Remove usuário

## Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/aicoach-back.git
cd aicoach-back
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Ajuste as configurações conforme necessário:
  - `PORT`: Porta em que a API rodará (padrão: 3000)
  - `MONGODB_URI`: URI de conexão com o MongoDB
  - `JWT_SECRET`: Chave secreta para assinatura de tokens JWT
  - `JWT_EXPIRES_IN`: Tempo de expiração dos tokens (formato: '1d', '12h', etc.)
  - `NODE_ENV`: Ambiente de execução ('development', 'production', 'test')

4. Execute a aplicação:
```bash
# Modo de desenvolvimento
npm run dev

# Construir para produção
npm run build

# Executar em produção
npm start
```

5. Acesse a documentação Swagger:
```
http://localhost:3000/api-docs
```

## Scripts Disponíveis

- `npm run dev`: Executa a aplicação em modo de desenvolvimento
- `npm run build`: Compila o TypeScript para JavaScript
- `npm start`: Executa a aplicação compilada
- `npm test`: Executa os testes unitários
- `npm run test:watch`: Executa os testes em modo de observação
- `npm run lint`: Executa a verificação de linting
- `npm run lint:fix`: Corrige automaticamente problemas de linting
- `npm run seed:admin`: Cria um usuário administrador inicial

## Configurações e Arquivos Importantes

- `.env`: Variáveis de ambiente (não versionado)
- `.eslintrc.ts`: Configurações de linting
- `jest.config.ts`: Configurações dos testes
- `tsconfig.json`: Configurações do TypeScript

## Convenções de Código

- Prefixar variáveis não utilizadas com `_` (exemplo: `_variable`)
- Utilizar interfaces para definição de contratos
- Seguir princípios SOLID e Clean Architecture
- Utilizar o padrão Repository para acesso a dados
- Utilizar camelCase para nomes de variáveis e métodos
- Utilizar PascalCase para nomes de classes e interfaces

## Segurança

- Autenticação via JWT (JSON Web Token)
- Senhas armazenadas com hash usando bcrypt
- Validação de tokens expirados
- Middleware de autenticação para proteger rotas privadas
- Expiração de tokens configurável via variável de ambiente

## Melhorias Futuras

- Implementação de cache com Redis
- Testes de integração e end-to-end
- CI/CD com GitHub Actions
- Containerização com Docker
- Documentação mais detalhada dos endpoints
- Implementação de refresh tokens

## Produzido por
- Samuel Camargo
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '../swagger/swagger';
import { setupRoutes } from './routes';

config();

const app = express();

// Middleware básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Configuração do Helmet para permitir o Swagger UI
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  })
);

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Setup de rotas
setupRoutes(app);

export default app; 
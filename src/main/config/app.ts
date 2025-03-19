import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
import { setupSwagger } from '../swagger/serve-swagger';
import { setupRoutes } from './routes';

config();

const app = express();

// Middleware básicos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Aplicar Helmet para todas as rotas exceto o Swagger
app.use(helmet());

// Configuração do Swagger personalizada
setupSwagger(app);

// Setup de rotas
setupRoutes(app);

export default app; 
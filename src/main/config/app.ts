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
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ['\'self\''],
        scriptSrc: ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
        styleSrc: ['\'self\'', '\'unsafe-inline\'', 'https://aicoach-back.vercel.app'],
        imgSrc: ['\'self\'', 'data:', 'https:'],
        connectSrc: ['\'self\'', 'https://aicoach-back.vercel.app']
      }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  swaggerOptions: {
    persistAuthorization: true
  }
}));

// Setup de rotas
setupRoutes(app);

export default app; 
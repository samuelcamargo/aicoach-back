import { Express, Router } from 'express';
import { readdirSync } from 'fs';
import { join } from 'path';
import { makeAuthController } from '../factories/auth.factory';
import { makeUserController } from '../factories/user.factory';
import { makeAuthMiddleware } from '../factories/middleware.factory';

export const setupRoutes = (app: Express): void => {
  const router = Router();
  app.use('/api', router);

  const authController = makeAuthController();
  const userController = makeUserController();
  const authMiddleware = makeAuthMiddleware();

  // Importando dinamicamente todas as rotas
  const routesPath = join(__dirname, '../routes');
  
  // Carregando todas as rotas
  readdirSync(routesPath).filter(file => !file.endsWith('.map')).forEach(file => {
    if (file.endsWith('.routes.ts')) {
      // Usando dynamic import em vez de require
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const route = require(join(routesPath, file)).default;
      route(router, authController, userController, authMiddleware);
    }
  });
}; 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutes = void 0;
const express_1 = require("express");
const fs_1 = require("fs");
const path_1 = require("path");
const auth_factory_1 = require("../factories/auth.factory");
const user_factory_1 = require("../factories/user.factory");
const middleware_factory_1 = require("../factories/middleware.factory");
const setupRoutes = (app) => {
    const router = (0, express_1.Router)();
    app.use('/api', router);
    const authController = (0, auth_factory_1.makeAuthController)();
    const userController = (0, user_factory_1.makeUserController)();
    const authMiddleware = (0, middleware_factory_1.makeAuthMiddleware)();
    // Importando dinamicamente todas as rotas
    const routesPath = (0, path_1.join)(__dirname, '../routes');
    // Carregando todas as rotas
    (0, fs_1.readdirSync)(routesPath).filter(file => !file.endsWith('.map')).forEach(file => {
        if (file.endsWith('.routes.ts')) {
            // Usando dynamic import em vez de require
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const route = require((0, path_1.join)(routesPath, file)).default;
            route(router, authController, userController, authMiddleware);
        }
    });
};
exports.setupRoutes = setupRoutes;

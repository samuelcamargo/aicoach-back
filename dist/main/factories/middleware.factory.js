"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthMiddleware = void 0;
const auth_middleware_1 = require("../../presentation/middlewares/auth.middleware");
const jwt_adapter_1 = require("../../infra/cryptography/jwt-adapter");
const makeAuthMiddleware = () => {
    const jwtSecret = process.env.JWT_SECRET || 'default_secret';
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';
    const jwtAdapter = new jwt_adapter_1.JwtAdapter(jwtSecret, jwtExpiresIn);
    return new auth_middleware_1.AuthMiddleware(jwtAdapter);
};
exports.makeAuthMiddleware = makeAuthMiddleware;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAuthController = void 0;
const auth_controller_1 = require("../../presentation/controllers/auth.controller");
const authenticate_user_usecase_1 = require("../../domain/usecases/auth/authenticate-user.usecase");
const user_repository_1 = require("../../infra/database/mongodb/repositories/user.repository");
const bcrypt_adapter_1 = require("../../infra/cryptography/bcrypt-adapter");
const jwt_adapter_1 = require("../../infra/cryptography/jwt-adapter");
const makeAuthController = () => {
    const salt = 12;
    const bcryptAdapter = new bcrypt_adapter_1.BcryptAdapter(salt);
    const jwtSecret = process.env.JWT_SECRET || 'default_secret';
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';
    const jwtAdapter = new jwt_adapter_1.JwtAdapter(jwtSecret, jwtExpiresIn);
    const userRepository = new user_repository_1.MongoUserRepository();
    const authenticateUseCase = new authenticate_user_usecase_1.AuthenticateUser(userRepository, bcryptAdapter.compare.bind(bcryptAdapter), jwtAdapter.generate.bind(jwtAdapter));
    return new auth_controller_1.AuthController(authenticateUseCase);
};
exports.makeAuthController = makeAuthController;

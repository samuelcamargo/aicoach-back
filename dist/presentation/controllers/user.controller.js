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
exports.UserController = void 0;
class UserController {
    constructor(createUserUseCase, getUserUseCase, getAllUsersUseCase, updateUserUseCase, deleteUserUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.getUserUseCase = getUserUseCase;
        this.getAllUsersUseCase = getAllUsersUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, phone, login, password, accessLevel } = req.body;
                if (!name || !email || !phone || !login || !password || !accessLevel) {
                    return res.status(400).json({
                        error: 'Missing required fields: name, email, phone, login, password, accessLevel'
                    });
                }
                // Log para debug
                console.log('Criando usuário com os dados:', {
                    name, email, phone, login, accessLevel
                });
                const user = yield this.createUserUseCase.execute({
                    name,
                    email,
                    phone,
                    login,
                    password,
                    accessLevel
                });
                return res.status(201).json(user);
            }
            catch (error) {
                // Log detalhado do erro
                console.error('Erro ao criar usuário:', error);
                if (error instanceof Error) {
                    if (error.message.includes('already in use')) {
                        return res.status(409).json({ error: error.message });
                    }
                    // Em ambiente de desenvolvimento, mostrar o erro completo
                    if (process.env.NODE_ENV === 'development') {
                        return res.status(500).json({
                            error: 'Internal server error',
                            details: error.message,
                            stack: error.stack
                        });
                    }
                }
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield this.getUserUseCase.execute(id);
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                return res.status(200).json(user);
            }
            catch (_error) {
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    getAll(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.getAllUsersUseCase.execute();
                return res.status(200).json(users);
            }
            catch (_error) {
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, email, phone, login, password, accessLevel } = req.body;
                if (Object.keys(req.body).length === 0) {
                    return res.status(400).json({ error: 'No update data provided' });
                }
                const updatedUser = yield this.updateUserUseCase.execute(id, {
                    name,
                    email,
                    phone,
                    login,
                    password,
                    accessLevel
                });
                if (!updatedUser) {
                    return res.status(404).json({ error: 'User not found' });
                }
                return res.status(200).json(updatedUser);
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message.includes('already in use')) {
                        return res.status(409).json({ error: error.message });
                    }
                }
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deleted = yield this.deleteUserUseCase.execute(id);
                if (!deleted) {
                    return res.status(404).json({ error: 'User not found' });
                }
                return res.status(204).send();
            }
            catch (_error) {
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.UserController = UserController;

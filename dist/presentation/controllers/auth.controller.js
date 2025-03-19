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
exports.AuthController = void 0;
class AuthController {
    constructor(authenticateUserUseCase) {
        this.authenticateUserUseCase = authenticateUserUseCase;
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password } = req.body;
                if (!login || !password) {
                    return res.status(400).json({ error: 'Login and password are required' });
                }
                const authResult = yield this.authenticateUserUseCase.execute({ login, password });
                return res.status(200).json(authResult);
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message === 'Invalid login or password') {
                        return res.status(401).json({ error: error.message });
                    }
                }
                return res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.AuthController = AuthController;

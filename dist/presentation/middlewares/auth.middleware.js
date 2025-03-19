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
exports.AuthMiddleware = void 0;
class AuthMiddleware {
    constructor(jwtAdapter) {
        this.jwtAdapter = jwtAdapter;
        this.auth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({ error: 'No token provided' });
                return;
            }
            const parts = authHeader.split(' ');
            if (parts.length !== 2) {
                res.status(401).json({ error: 'Token error' });
                return;
            }
            const [scheme, token] = parts;
            if (!/^Bearer$/i.test(scheme)) {
                res.status(401).json({ error: 'Token malformatted' });
                return;
            }
            const userId = yield this.jwtAdapter.verify(token);
            if (!userId) {
                res.status(401).json({ error: 'Invalid token' });
                return;
            }
            req.userId = userId;
            next();
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;

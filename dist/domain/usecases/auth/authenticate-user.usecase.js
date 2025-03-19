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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUser = void 0;
class AuthenticateUser {
    constructor(userRepository, hashComparer, tokenGenerator) {
        this.userRepository = userRepository;
        this.hashComparer = hashComparer;
        this.tokenGenerator = tokenGenerator;
    }
    execute(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            const { login, password } = credentials;
            // Buscar usuário pelo login
            const user = yield this.userRepository.findByLogin(login);
            if (!user) {
                throw new Error('Invalid login or password');
            }
            // Verificar se a senha está correta
            const isPasswordValid = yield this.hashComparer(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid login or password');
            }
            // Gerar token JWT
            const { token, expiresIn } = yield this.tokenGenerator(user.id);
            // Remover senha do objeto de usuário para retorno
            const { password: _pass } = user, userWithoutPassword = __rest(user, ["password"]);
            return {
                user: userWithoutPassword,
                token,
                expiresIn
            };
        });
    }
}
exports.AuthenticateUser = AuthenticateUser;

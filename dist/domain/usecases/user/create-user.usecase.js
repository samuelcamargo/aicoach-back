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
exports.CreateUser = void 0;
class CreateUser {
    constructor(userRepository, hashPassword) {
        this.userRepository = userRepository;
        this.hashPassword = hashPassword;
    }
    execute(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar se o login já existe
            const existingUserLogin = yield this.userRepository.findByLogin(userData.login);
            if (existingUserLogin) {
                throw new Error('Login already in use');
            }
            // Verificar se o email já existe
            const existingUserEmail = yield this.userRepository.findByEmail(userData.email);
            if (existingUserEmail) {
                throw new Error('Email already in use');
            }
            // Criptografar a senha
            const hashedPassword = yield this.hashPassword(userData.password);
            // Criar o usuário
            const user = yield this.userRepository.create(Object.assign(Object.assign({}, userData), { password: hashedPassword }));
            // Remover a senha do objeto de retorno
            const { password: _pass } = user, userWithoutPassword = __rest(user, ["password"]);
            return userWithoutPassword;
        });
    }
}
exports.CreateUser = CreateUser;

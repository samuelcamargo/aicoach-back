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
exports.UpdateUser = void 0;
class UpdateUser {
    constructor(userRepository, hashPassword) {
        this.userRepository = userRepository;
        this.hashPassword = hashPassword;
    }
    execute(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar se o usuário existe
            const existingUser = yield this.userRepository.findById(id);
            if (!existingUser) {
                return null;
            }
            // Verificar se o login já está em uso por outro usuário
            if (userData.login && userData.login !== existingUser.login) {
                const userWithSameLogin = yield this.userRepository.findByLogin(userData.login);
                if (userWithSameLogin && userWithSameLogin.id !== id) {
                    throw new Error('Login already in use');
                }
            }
            // Verificar se o email já está em uso por outro usuário
            if (userData.email && userData.email !== existingUser.email) {
                const userWithSameEmail = yield this.userRepository.findByEmail(userData.email);
                if (userWithSameEmail && userWithSameEmail.id !== id) {
                    throw new Error('Email already in use');
                }
            }
            // Criar objeto de atualização
            const updateData = Object.assign({}, userData);
            // Se houver uma nova senha, criptografá-la
            if (userData.password) {
                updateData.password = yield this.hashPassword(userData.password);
            }
            // Atualizar o usuário
            const updatedUser = yield this.userRepository.update(id, updateData);
            if (!updatedUser) {
                return null;
            }
            // Remover a senha do objeto de retorno
            const { password: _pass } = updatedUser, userWithoutPassword = __rest(updatedUser, ["password"]);
            return userWithoutPassword;
        });
    }
}
exports.UpdateUser = UpdateUser;

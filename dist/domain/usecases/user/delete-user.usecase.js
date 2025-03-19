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
exports.DeleteUser = void 0;
class DeleteUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar se o usuário existe
            const existingUser = yield this.userRepository.findById(id);
            if (!existingUser) {
                return false;
            }
            // Deletar o usuário
            return this.userRepository.delete(id);
        });
    }
}
exports.DeleteUser = DeleteUser;

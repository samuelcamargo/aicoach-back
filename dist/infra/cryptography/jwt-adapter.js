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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAdapter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtAdapter {
    constructor(secret, expiresIn) {
        this.secret = secret;
        this.expiresIn = expiresIn;
    }
    generate(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Calcular o timestamp de expiração baseado na string de configuração
            // Por exemplo, se expiresIn for "1d", precisamos calcular quantos segundos são 1 dia
            // e depois adicionar ao timestamp atual
            const timeValues = {
                's': 1, // segundos
                'm': 60, // minutos em segundos
                'h': 60 * 60, // horas em segundos
                'd': 24 * 60 * 60 // dias em segundos
            };
            // Parsear o valor de expiresIn (exemplo: "1d" -> 1 dia em segundos)
            let expiresInSeconds = 0;
            if (this.expiresIn) {
                const unit = this.expiresIn.slice(-1);
                const value = parseInt(this.expiresIn.slice(0, -1), 10);
                if (!isNaN(value) && timeValues[unit]) {
                    expiresInSeconds = value * timeValues[unit];
                }
                else {
                    // Se o formato não for reconhecido, usa o padrão de 1 dia
                    expiresInSeconds = 24 * 60 * 60; // 1 dia em segundos
                }
            }
            else {
                // Se não houver configuração, usa o padrão de 1 dia
                expiresInSeconds = 24 * 60 * 60; // 1 dia em segundos
            }
            // Calcular timestamp de expiração (tempo atual + segundos de expiração)
            const expirationTimestamp = Math.floor(Date.now() / 1000) + expiresInSeconds;
            // Gerar o token com a mesma configuração de expiração
            const token = jsonwebtoken_1.default.sign({ id: userId }, this.secret, { expiresIn: this.expiresIn });
            return {
                token,
                expiresIn: expirationTimestamp
            };
        });
    }
    verify(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, this.secret);
                // Verificar se o token está expirado
                const currentTimestamp = Math.floor(Date.now() / 1000);
                if (decoded.exp && decoded.exp < currentTimestamp) {
                    // Token expirado
                    return null;
                }
                return decoded.id;
            }
            catch (_error) {
                return null;
            }
        });
    }
}
exports.JwtAdapter = JwtAdapter;

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
exports.MongoUserRepository = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
class MongoUserRepository {
    userDocumentToEntity(userDoc) {
        return {
            id: userDoc._id.toString(),
            name: userDoc.name,
            email: userDoc.email,
            phone: userDoc.phone,
            login: userDoc.login,
            password: userDoc.password,
            accessLevel: userDoc.accessLevel,
            createdAt: userDoc.createdAt,
            updatedAt: userDoc.updatedAt
        };
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_model_1.default(userData);
            const savedUser = yield user.save();
            return this.userDocumentToEntity(savedUser);
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findById(id);
                return user ? this.userDocumentToEntity(user) : null;
            }
            catch (_error) {
                return null;
            }
        });
    }
    findByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ login });
            return user ? this.userDocumentToEntity(user) : null;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ email });
            return user ? this.userDocumentToEntity(user) : null;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.default.find();
            return users.map(user => this.userDocumentToEntity(user));
        });
    }
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = yield user_model_1.default.findByIdAndUpdate(id, Object.assign(Object.assign({}, userData), { updatedAt: new Date() }), { new: true });
                return updatedUser ? this.userDocumentToEntity(updatedUser) : null;
            }
            catch (_error) {
                return null;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield user_model_1.default.findByIdAndDelete(id);
                return !!result;
            }
            catch (_error) {
                return false;
            }
        });
    }
}
exports.MongoUserRepository = MongoUserRepository;

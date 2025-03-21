"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'aiCoach API',
        version: '1.0.0',
        description: 'API para o sistema aiCoach',
        contact: {
            name: 'aiCoach Support',
            email: 'support@aicoach.com'
        }
    },
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Servidor de desenvolvimento'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [
        {
            bearerAuth: []
        }
    ]
};
const options = {
    swaggerDefinition,
    apis: ['./src/main/routes/*.ts']
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);

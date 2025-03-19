"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const app_1 = __importDefault(require("./main/config/app"));
const connection_1 = require("./infra/database/mongodb/connection");
(0, dotenv_1.config)();
const PORT = process.env.PORT || 3000;
(0, connection_1.connectDB)()
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
})
    .catch((error) => {
    console.error('Database connection error:', error);
});

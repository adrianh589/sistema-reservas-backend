"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
const dbConfig = process.env; // Acceso a las variables de entorno
const typedDbConfig = dbConfig; // Convertido a Env
const db = new sequelize_1.Sequelize({
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
            ca: fs_1.default.readFileSync(__dirname + '/certs/ca-cert.pem').toString(), // Ajusta la ruta según tu estructura de proyecto
        },
    },
    host: typedDbConfig.DB_HOST,
    port: parseInt(typedDbConfig.DB_PORT),
    username: typedDbConfig.DB_USERNAME,
    password: typedDbConfig.DB_PASSWORD,
    database: typedDbConfig.DB_NAME,
});
exports.default = db;
//# sourceMappingURL=connection.js.map
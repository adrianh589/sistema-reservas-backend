"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv/config");
const dbConfig = process.env; // Acceso a las variables de entorno
const typedDbConfig = dbConfig; // Convertido a Env
const db = new sequelize_1.Sequelize({
    dialect: typedDbConfig.DB_DIALECT,
    host: typedDbConfig.DB_HOST,
    port: parseInt(typedDbConfig.DB_PORT),
    username: typedDbConfig.DB_USERNAME,
    password: typedDbConfig.DB_PASSWORD,
    database: typedDbConfig.DB_NAME,
});
exports.default = db;
//# sourceMappingURL=connection.js.map
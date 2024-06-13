import { Dialect, Sequelize } from 'sequelize';
import 'dotenv/config';
import fs from "fs";

// Definir tipos para variables de entorno
interface Env {
    DB_NAME: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DIALECT: string;
}

const dbConfig: unknown = process.env as unknown; // Acceso a las variables de entorno
const typedDbConfig = dbConfig as Env; // Convertido a Env

const db = new Sequelize({
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
            ca: fs.readFileSync(__dirname + '/../certs/ca-cert.pem').toString(), // Ajusta la ruta según tu estructura de proyecto
        },
    },
    host: typedDbConfig.DB_HOST,
    port: parseInt(typedDbConfig.DB_PORT),
    username: typedDbConfig.DB_USERNAME,
    password: typedDbConfig.DB_PASSWORD,
    database: typedDbConfig.DB_NAME,
});

export default db;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministradorClass = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
/**
 * Modelo que representa la tabla Administradores en TypeScript
 */
class AdministradorClass extends sequelize_1.Model {
}
exports.AdministradorClass = AdministradorClass;
/**
 * Modelo que representa la tabla Administradores
 */
const Administrador = connection_1.default.define('Administrador', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    correo: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    fecha_creacion: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    fecha_modificacion: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        onUpdate: 'CURRENT_TIMESTAMP'
    },
}, {
    tableName: 'Administradores', // Nombre de la tabla en la base de datos
    timestamps: false // Para que no cree createdAt ni updatedAt
});
exports.default = Administrador;
//# sourceMappingURL=administrador.js.map
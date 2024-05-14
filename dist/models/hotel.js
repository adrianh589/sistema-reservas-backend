"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
/**
 * Modelo que representa la tabla Hotel en TypeScript
 */
class HotelClass extends sequelize_1.Model {
}
/**
 * Modelo que representa la tabla Hotel
 */
const Hotel = connection_1.default.define('Hoteles', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    habilitado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    fecha_creacion: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    fecha_modificacion: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        onUpdate: 'CURRENT_TIMESTAMP'
    }
}, {
    tableName: 'Hoteles',
    timestamps: false
});
exports.default = Hotel;
//# sourceMappingURL=hotel.js.map
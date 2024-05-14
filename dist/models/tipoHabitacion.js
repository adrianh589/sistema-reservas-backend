"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
/**
 * Modelo que representa la tabla Tipos_Habitaciones en TypeScript
 */
class TipoHabitacionClass extends sequelize_1.Model {
}
/**
 * Modelo que representa la tabla Tipos_Habitaciones
 */
const TipoHabitacion = connection_1.default.define('TipoHabitacion', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(50),
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
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'Tipos_Habitaciones',
    timestamps: false
});
exports.default = TipoHabitacion;
//# sourceMappingURL=tipoHabitacion.js.map
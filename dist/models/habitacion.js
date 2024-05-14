"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const tipoHabitacion_1 = __importDefault(require("./tipoHabitacion"));
/**
 * Modelo que representa la tabla Habitacion en TypeScript
 */
class HabitacionClass extends sequelize_1.Model {
}
/**
 * Modelo que representa la tabla Habitacion
 */
const Habitacion = connection_1.default.define('Habitaciones', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_hotel: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'Hoteles',
            key: 'id'
        }
    },
    id_tipo_habitacion: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: tipoHabitacion_1.default,
            key: 'id'
        }
    },
    valor: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    habilitado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    impuestos: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    numero_habitacion: {
        type: sequelize_1.DataTypes.INTEGER,
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
    }
}, {
    tableName: 'Habitaciones',
    timestamps: false
});
exports.default = Habitacion;
//# sourceMappingURL=habitacion.js.map
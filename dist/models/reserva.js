"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const habitacion_1 = __importDefault(require("./habitacion"));
const reservista_1 = __importDefault(require("./reservista"));
const contactoEmergencia_1 = __importDefault(require("./contactoEmergencia"));
/**
 * Modelo que representa la tabla Reserva en TypeScript
 */
class ReservaClass extends sequelize_1.Model {
}
/**
 * Modelo que representa la tabla Reserva
 */
const Reserva = connection_1.default.define('Reserva', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_reservista: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    id_habitacion: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    id_contacto_emergencia: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    fecha_inicio_reserva: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    fecha_fin_reserva: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    cantidad_personas: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    total_pagado: {
        type: sequelize_1.DataTypes.DECIMAL,
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
    tableName: 'Reservas',
    timestamps: false
});
Reserva.belongsTo(reservista_1.default, { foreignKey: 'id_reservista' });
Reserva.belongsTo(habitacion_1.default, { foreignKey: 'id_habitacion' });
Reserva.belongsTo(contactoEmergencia_1.default, { foreignKey: 'id_contacto_emergencia' });
exports.default = Reserva;
//# sourceMappingURL=reserva.js.map
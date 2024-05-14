"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactoEmergenciaClass = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
/**
 * Modelo que representa la tabla Contacto_Emergencia en TypeScript
 */
class ContactoEmergenciaClass extends sequelize_1.Model {
}
exports.ContactoEmergenciaClass = ContactoEmergenciaClass;
/**
 * Modelo que representa la tabla Contacto_Emergencia
 */
const ContactoEmergencia = connection_1.default.define('ContactoEmergencia', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nombres: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
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
    tableName: 'Contacto_Emergencia',
    timestamps: false
});
exports.default = ContactoEmergencia;
//# sourceMappingURL=contactoEmergencia.js.map
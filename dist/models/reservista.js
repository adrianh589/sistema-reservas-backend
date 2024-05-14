"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservistaClass = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const tipoDocumento_1 = __importDefault(require("./tipoDocumento"));
/**
 * Modelo que representa la tabla Reservista en TypeScript
 */
class ReservistaClass extends sequelize_1.Model {
}
exports.ReservistaClass = ReservistaClass;
/**
 * Modelo que representa la tabla Reservista
 */
const Reservista = connection_1.default.define('Reservista', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nombres: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    correo: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    fecha_nacimiento: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    genero: {
        type: sequelize_1.DataTypes.ENUM('M', 'F'),
        allowNull: false
    },
    tipo_documento_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: tipoDocumento_1.default,
            key: 'id'
        }
    },
    numero_documento: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    telefono_contacto: {
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
    },
}, {
    tableName: 'Reservistas',
    timestamps: false
});
exports.default = Reservista;
//# sourceMappingURL=reservista.js.map
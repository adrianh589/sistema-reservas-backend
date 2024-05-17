"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const reserva_1 = __importDefault(require("./reserva"));
const reservista_1 = __importDefault(require("./reservista"));
const tipoDocumento_1 = __importDefault(require("./tipoDocumento"));
/**
 * Modelo que representa la tabla Huesped en TypeScript
 */
class HuespedClass extends sequelize_1.Model {
}
/**
 * Modelo que representa la tabla Huesped
 */
const Huesped = connection_1.default.define('Huesped', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_reserva: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: reserva_1.default,
            key: 'id'
        }
    },
    id_reservista: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    nombres: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
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
        allowNull: true
    },
    numero_documento: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    correo: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    telefono_contacto: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    }
}, {
    tableName: 'Huespedes',
    timestamps: false
});
// Definir relaciones
Huesped.belongsTo(reserva_1.default, { foreignKey: 'id_reserva' });
Huesped.belongsTo(reservista_1.default, { foreignKey: 'id_reservista' });
Huesped.belongsTo(tipoDocumento_1.default, { foreignKey: 'tipo_documento_id' });
exports.default = Huesped;
//# sourceMappingURL=huesped.js.map
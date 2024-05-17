"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HabitacionClass = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const tipoHabitacion_1 = __importDefault(require("./tipoHabitacion"));
const hotel_1 = __importDefault(require("./hotel"));
const ubicacionHabitacion_1 = __importDefault(require("./ubicacionHabitacion"));
/**
 * Modelo que representa la tabla Habitacion en TypeScript
 */
class HabitacionClass extends sequelize_1.Model {
}
exports.HabitacionClass = HabitacionClass;
/**
 * Modelo que representa la tabla Habitacion
 */
const Habitacion = connection_1.default.define('Habitacion', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_hotel: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'Hotel',
            key: 'id'
        }
    },
    id_tipo_habitacion: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'TipoHabitacion',
            key: 'id'
        }
    },
    id_ubicacion_habitacion: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: 'UbicacionHabitacion',
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
Habitacion.belongsTo(hotel_1.default, { foreignKey: 'id_hotel' });
Habitacion.belongsTo(tipoHabitacion_1.default, { foreignKey: 'id_tipo_habitacion' });
Habitacion.belongsTo(ubicacionHabitacion_1.default, { foreignKey: 'id_ubicacion_habitacion' });
exports.default = Habitacion;
//# sourceMappingURL=habitacion.js.map
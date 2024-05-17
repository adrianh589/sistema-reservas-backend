"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
/**
 * Modelo que representa la tabla Ubicaciones_Habitaciones
 */
class UbicacionHabitacionClass extends sequelize_1.Model {
}
const UbicacionHabitacion = connection_1.default.define('UbicacionHabitacion', {
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    ciudad: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    fecha_creacion: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    fecha_modificacion: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        onUpdate: 'CURRENT_TIMESTAMP',
    },
}, {
    tableName: 'Ubicaciones_Habitaciones',
    timestamps: false,
});
exports.default = UbicacionHabitacion;
//# sourceMappingURL=ubicacionHabitacion.js.map
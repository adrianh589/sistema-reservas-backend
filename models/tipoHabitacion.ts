import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface TipoHabitacionAttributes {
    id: number;
    nombre: string;
    fecha_creacion: Date;
    fecha_modificacion: Date;
}

/**
 * Modelo que representa la tabla Tipos_Habitaciones en TypeScript
 */
class TipoHabitacionClass extends Model<TipoHabitacionAttributes> implements TipoHabitacionAttributes {
    public id!: number;
    public nombre!: string;
    public fecha_creacion!: Date;
    public fecha_modificacion!: Date;
}

/**
 * Modelo que representa la tabla Tipos_Habitaciones
 */
const TipoHabitacion = db.define('TipoHabitacion', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    fecha_modificacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: 'CASCADE'
    }
}, {
    tableName: 'Tipos_Habitaciones',
    timestamps: false
});

export default TipoHabitacion;

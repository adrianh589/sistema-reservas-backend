import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Habitacion from './habitacion';

/**
 * Modelo que representa la tabla Ubicaciones_Habitaciones en TypeScript
 */
interface UbicacionHabitacionAttributes {
    id: number;
    ciudad: string;
    fecha_creacion: Date;
    fecha_modificacion: Date;
}


/**
 * Modelo que representa la tabla Ubicaciones_Habitaciones
 */
class UbicacionHabitacionClass extends Model<UbicacionHabitacionAttributes> implements UbicacionHabitacionAttributes {
    public id!: number;
    public ciudad!: string;
    public fecha_creacion!: Date;
    public fecha_modificacion!: Date;
}

const UbicacionHabitacion = db.define('UbicacionHabitacion', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        ciudad: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        fecha_creacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        fecha_modificacion: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            onUpdate: 'CURRENT_TIMESTAMP',
        },
    },
    {
        tableName: 'Ubicaciones_Habitaciones',
        timestamps: false,
    }
);

export default UbicacionHabitacion;

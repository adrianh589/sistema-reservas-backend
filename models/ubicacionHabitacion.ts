import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Habitacion from './habitacion';

/**
 * Modelo que representa la tabla Ubicaciones_Habitaciones en TypeScript
 */
interface UbicacionHabitacionAttributes {
    id: number;
    id_habitacion: number;
    ciudad: string;
    direccion: string;
    coordenadas: string;
    fecha_creacion: Date;
    fecha_modificacion: Date;
}


/**
 * Modelo que representa la tabla Ubicaciones_Habitaciones
 */
class UbicacionHabitacionClass extends Model<UbicacionHabitacionAttributes> implements UbicacionHabitacionAttributes {
    public id!: number;
    public id_habitacion!: number;
    public ciudad!: string;
    public direccion!: string;
    public coordenadas!: string;
    public fecha_creacion!: Date;
    public fecha_modificacion!: Date;
}

const UbicacionHabitacion = db.define('UbicacionHabitacion', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        id_habitacion: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        ciudad: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        direccion: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        coordenadas: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: true,
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
        timestamps: false, // Opcional si no necesitas createdAt y updatedAt
    }
);

UbicacionHabitacion.belongsTo(Habitacion, { foreignKey: 'id_habitacion' });

export default UbicacionHabitacion;

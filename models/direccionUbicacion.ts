import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

/**
 * Modelo que representa la tabla de Direcciones_Ubicaciones
 */

interface DireccionUbicacionAttributes {
    id: number;
    id_ubicacion_habitacion: number;
    direccion: string;
    fecha_creacion: Date;
    fecha_modificacion: Date;
}

class DireccionUbicacionClass extends Model<DireccionUbicacionAttributes> implements DireccionUbicacionAttributes {
    public id!: number;
    public direccion!: string;
    public id_ubicacion_habitacion!: number;
    public fecha_creacion!: Date;
    public fecha_modificacion!: Date;
}

const DireccionUbicacion = db.define('DireccionUbicacion', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    id_ubicacion_habitacion: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'Ubicaciones_Habitaciones',
            key: 'id'
        }
    },
    direccion: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
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
}, {
    tableName: 'Direcciones_Ubicaciones',
    timestamps: false,
});

export default DireccionUbicacion;

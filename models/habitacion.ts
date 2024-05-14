import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import TipoHabitacion from './tipoHabitacion';

interface HabitacionAttributes {
    id: number;
    id_hotel: number;
    id_tipo_habitacion: number;
    valor: number;
    habilitado: boolean;
    impuestos: number;
    numero_habitacion: number;
    fecha_creacion: Date;
    fecha_modificacion: Date;
}


/**
 * Modelo que representa la tabla Habitacion en TypeScript
 */

class HabitacionClass extends Model<HabitacionAttributes> implements HabitacionAttributes {
    public id!: number;
    public id_hotel!: number;
    public id_tipo_habitacion!: number;
    public valor!: number;
    public habilitado!: boolean;
    public impuestos!: number;
    public numero_habitacion!: number;
    public fecha_creacion!: Date;
    public fecha_modificacion!: Date;
}

/**
 * Modelo que representa la tabla Habitacion
 */

const Habitacion = db.define('Habitaciones', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_hotel: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'Hoteles',
            key: 'id'
        }
    },
    id_tipo_habitacion: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: TipoHabitacion,
            key: 'id'
        }
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    habilitado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    impuestos: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false
    },
    numero_habitacion: {
        type: DataTypes.INTEGER,
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
        onUpdate: 'CURRENT_TIMESTAMP'
    }
}, {
    tableName: 'Habitaciones',
    timestamps: false
});

export default Habitacion;

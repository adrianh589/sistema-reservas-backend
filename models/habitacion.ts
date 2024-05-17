import {DataTypes, Model} from 'sequelize';
import db from '../db/connection';
import TipoHabitacion from './tipoHabitacion';
import Hotel from "./hotel";
import UbicacionHabitacion from "./ubicacionHabitacion";

export interface HabitacionAttributes {
    id: number;
    id_hotel: number;
    id_tipo_habitacion: number;
    id_ubicacion_habitacion: number;
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

export class HabitacionClass extends Model<HabitacionAttributes> implements HabitacionAttributes {
    public id!: number;
    public id_hotel!: number;
    public id_tipo_habitacion!: number;
    public id_ubicacion_habitacion!: number;
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

const Habitacion = db.define('Habitacion', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_hotel: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'Hotel',
            key: 'id'
        }
    },
    id_tipo_habitacion: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'TipoHabitacion',
            key: 'id'
        }
    },
    id_ubicacion_habitacion: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: 'UbicacionHabitacion',
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

Habitacion.belongsTo(Hotel, {foreignKey: 'id_hotel'});
Habitacion.belongsTo(TipoHabitacion, {foreignKey: 'id_tipo_habitacion'});
Habitacion.belongsTo(UbicacionHabitacion, {foreignKey: 'id_ubicacion_habitacion'});

export default Habitacion;

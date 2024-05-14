import {DataTypes, Model} from 'sequelize';
import db from '../db/connection';

interface HotelAttributes {
    id: number;
    nombre: string;
    habilitado: boolean;
    fecha_creacion: Date;
    fecha_modificacion: Date;
}

/**
 * Modelo que representa la tabla Hotel en TypeScript
 */

class HotelClass extends Model<HotelAttributes> implements HotelAttributes {
    public id!: number;
    public nombre!: string;
    public habilitado!: boolean;
    public fecha_creacion!: Date;
    public fecha_modificacion!: Date;
}


/**
 * Modelo que representa la tabla Hotel
 */
const Hotel = db.define('Hoteles', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    habilitado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    tableName: 'Hoteles',
    timestamps: false
});

export default Hotel;

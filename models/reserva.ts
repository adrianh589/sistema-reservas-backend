import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface ReservaAttributes {
    id: number;
    id_reservista: number;
    id_habitacion: number;
    id_contacto_emergencia: number;
    fecha_inicio_reserva: Date;
    fecha_fin_reserva: Date;
    cantidad_personas: number;
    total_pagado: number;
    fecha_creacion: Date;
    fecha_modificacion: Date;
}

/**
 * Modelo que representa la tabla Reserva en TypeScript
 */
class ReservaClass extends Model<ReservaAttributes> implements ReservaAttributes {
    public id!: number;
    public id_reservista!: number;
    public id_habitacion!: number;
    public id_contacto_emergencia!: number;
    public fecha_inicio_reserva!: Date;
    public fecha_fin_reserva!: Date;
    public cantidad_personas!: number;
    total_pagado!: number;
    public fecha_creacion!: Date;
    public fecha_modificacion!: Date;
}

/**
 * Modelo que representa la tabla Reserva
 */
const Reserva = db.define('Reservas', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_reservista: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    id_habitacion: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    id_contacto_emergencia: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    fecha_inicio_reserva: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_fin_reserva: {
        type: DataTypes.DATE,
        allowNull: false
    },
    cantidad_personas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_pagado: {
        type: DataTypes.DECIMAL,
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
    tableName: 'Reservas',
    timestamps: false
});

export default Reserva;

import {DataTypes, Model} from 'sequelize';
import db from "../db/connection";

interface AdministradorAttributes {
    id: number;
    username: string;
    password: string;
    correo: string;
    fecha_creacion: Date;
    fecha_modificacion: Date;
}

/**
 * Modelo que representa la tabla Administradores en TypeScript
 */

export class AdministradorClass extends Model<AdministradorAttributes> implements AdministradorAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
    public correo!: string;
    public fecha_creacion!: Date;
    public fecha_modificacion!: Date;
}

/**
 * Modelo que representa la tabla Administradores
 */

const Administrador = db.define('Administrador', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(100),
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
    },
}, {
    tableName: 'Administradores', // Nombre de la tabla en la base de datos
    timestamps: false // Para que no cree createdAt ni updatedAt
});

export default Administrador;

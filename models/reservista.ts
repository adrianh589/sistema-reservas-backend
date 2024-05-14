import {DataTypes, Model, Optional} from 'sequelize';
import db from '../db/connection';
import TipoDocumento from "./tipoDocumento";

interface ReservistaAttributes {
    id: number;
    nombres: string;
    correo: string;
    fecha_nacimiento: Date;
    genero: 'M' | 'F';
    tipo_documento_id: number;
    numero_documento: string;
    telefono_contacto: string;
    fecha_creacion: Date;
    fecha_modificacion: Date;
}

/**
 * Modelo que representa la tabla Reservista en TypeScript
 */
export class ReservistaClass extends Model<ReservistaAttributes> implements ReservistaAttributes {
    public id!: number;
    public username!: string;
    public password!: string;
    public correo!: string;
    public fecha_creacion!: Date;
    public fecha_modificacion!: Date;
    public fecha_nacimiento!: Date;
    public genero!: "M" | "F";
    public nombres!: string;
    public numero_documento!: string;
    public telefono_contacto!: string;
    public tipo_documento_id!: number;
}

/**
 * Modelo que representa la tabla Reservista
 */
const Reservista = db.define('Reservista', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    genero: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false
    },
    tipo_documento_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: TipoDocumento,
            key: 'id'
        }
    },
    numero_documento: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    telefono_contacto: {
        type: DataTypes.STRING(20),
        allowNull: false
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
    tableName: 'Reservistas',
    timestamps: false
});

export default Reservista;

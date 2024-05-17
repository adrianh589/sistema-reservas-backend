import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

interface ContactoEmergenciaAttributes {
    id: number;
    nombres: string;
    telefono_contacto: string;
    fecha_creacion: Date;
    fecha_modificacion: Date;
}

/**
 * Modelo que representa la tabla Contacto_Emergencia en TypeScript
 */

export class ContactoEmergenciaClass extends Model<ContactoEmergenciaAttributes> implements ContactoEmergenciaAttributes {
    public id!: number;
    public nombres!: string;
    public telefono_contacto!: string;
    public fecha_creacion!: Date;
    public fecha_modificacion!: Date;
}

/**
 * Modelo que representa la tabla Contacto_Emergencia
 */

const ContactoEmergencia = db.define<ContactoEmergenciaClass>('ContactoEmergencia', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false
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
    }
}, {
    tableName: 'Contacto_Emergencia',
    timestamps: false
});

export default ContactoEmergencia;

import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';
import Reserva from './reserva';
import Reservista from './reservista';
import TipoDocumento from './tipoDocumento';

interface HuespedAttributes {
    id: number;
    id_reserva: number;
    id_reservista: number;
    nombres: string;
    fecha_nacimiento: Date;
    genero: 'M' | 'F';
    tipo_documento_id?: number;
    numero_documento?: string;
    email?: string;
    telefono_contacto?: string;
}

/**
 * Modelo que representa la tabla Huesped en TypeScript
 */
class HuespedClass extends Model<HuespedAttributes> implements HuespedAttributes {
    public id!: number;
    public id_reserva!: number;
    public id_reservista!: number;
    public nombres!: string;
    public fecha_nacimiento!: Date;
    public genero!: 'M' | 'F';
    public tipo_documento_id?: number;
    public numero_documento?: string;
    public email?: string;
    public telefono_contacto?: string;
}

/**
 * Modelo que representa la tabla Huesped
 */
const Huesped = db.define('Huespedes', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    id_reserva: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Reserva,
            key: 'id'
        }
    },
    id_reservista: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false
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
        allowNull: true
    },
    numero_documento: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    telefono_contacto: {
        type: DataTypes.STRING(20),
        allowNull: true
    }
}, {
    tableName: 'Huespedes',
    timestamps: false
});

// Definir relaciones
Huesped.belongsTo(Reserva, { foreignKey: 'id_reserva' });
Huesped.belongsTo(Reservista, { foreignKey: 'id_reservista' });
Huesped.belongsTo(TipoDocumento, { foreignKey: 'tipo_documento_id' });

export default Huesped;

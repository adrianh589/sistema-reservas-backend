import {DataTypes} from 'sequelize';
import db from "../db/connection";

/**
 * Modelo que representa la tabla Tipos_Documento
 */
const TiposDocumento = db.define('TipoDocumentos', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.STRING(50),
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
    },
    {
        tableName: 'Tipos_Documento',
        timestamps: false,
    });

export default TiposDocumento;

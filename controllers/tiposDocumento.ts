import { Request, Response } from 'express';
import TipoDocumento from '../models/tipoDocumento';

/**
 * Obtiene todos los tipos de documentos.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con los tipos de documentos encontrados.
 */
export const getTiposDocumento = async (req: Request, res: Response) => {
    try {
        const tiposDocumento = await TipoDocumento.findAll();
        return res.json({
            ok: true,
            msg: 'Tipos de documentos encontrados',
            tiposDocumento
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los tipos de documento.'
        });
    }
};

/**
 * Obtiene un tipo de documento por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el tipo de documento encontrado.
 */
export const getTipoDocumento = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const tipoDocumento = await TipoDocumento.findByPk(id);
        if (!tipoDocumento){
            return res.json({
                ok: true,
                msg: `No se encontro un tipo de documento por el id: ${id}`
            });
        }
        return res.json({
            ok: true,
            msg: 'Tipo documento encontrado',
            tipoDocumento
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener el tipo de documento.'
        });
    }
};

/**
 * Crea un nuevo tipo de documento.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el tipo de documento creado.
 */
export const crearTipoDocumento = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const existeTipoDocumento = await TipoDocumento.findOne({ where: { tipo: body.tipo } });
        if (existeTipoDocumento) {
            return res.status(409).json({
                ok: false,
                msg: 'Ya existe un tipo de documento con ese nombre'
            });
        }
        const nuevoTipoDocumento = await TipoDocumento.create(body);
        res.json({
            ok: true,
            msg: `Tipo de documento creado correctamente`,
            nuevoTipoDocumento
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear el tipo de documento.'
        });
    }
};

/**
 * Actualiza un tipo de documento existente por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el tipo de documento actualizado.
 */
export const actualizarTipoDocumento = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const tipoDocumento = await TipoDocumento.findByPk(id);
        if (!tipoDocumento) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró el tipo de documento con id: ${ id }`
            });
        }
        await tipoDocumento.update(req.body);
        res.json({
            ok: true,
            msg: 'Tipo de documento actualizado correctamente',
            tipoDocumentoActualizado: tipoDocumento
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar el tipo de documento.'
        });
    }
};

/**
 * Elimina un tipo de documento por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON indicando si se eliminó el tipo de documento correctamente.
 */
export const eliminarTipoDocumento = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const tipoDocumento = await TipoDocumento.findByPk(id);
        if (!tipoDocumento) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró el tipo de documento.'
            });
        }
        await tipoDocumento.destroy();
        res.json({
            ok: true,
            msg: 'Tipo de documento eliminado correctamente.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al eliminar el tipo de documento.'
        });
    }
}

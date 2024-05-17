import { Request, Response } from 'express';
import DireccionUbicacion from '../models/direccionUbicacion';

/**
 * Obtiene todas las direcciones de ciudades.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 * @returns Una respuesta HTTP con todas las direcciones de ubicaciones.
 */
export const getDireccionesUbicaciones = async (req: Request, res: Response): Promise<void> => {
    try {
        const direccionesUbicaciones = await DireccionUbicacion.findAll();
        res.json({
            ok: true,
            msg: 'Direcciones de ciudades encontradas',
            direccionesUbicaciones
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al obtener las direcciones de ciudades'
        });
    }
};

/**
 * Crea una nueva dirección de ciudad.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 * @returns Una respuesta HTTP con la nueva dirección de ubicación creada.
 */
export const createDireccionUbicacion = async (req: Request, res: Response) => {
    try {

        // Verificar si ya existe un hotel con el mismo nombre
        const direccionUbicacionExistente = await DireccionUbicacion.findOne({ where: req.body });
        if (direccionUbicacionExistente) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un direccion denominada'
            });
        }

        const direccionUbicacion = await DireccionUbicacion.create(req.body);
        res.status(201).json({
            ok: true,
            msg: 'Direccion creada correctamente',
            direccionUbicacion
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la dirección de ciudad'
        });
    }
};

/**
 * Obtiene una dirección de ciudad por su ID.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 * @returns Una respuesta HTTP con la dirección de ubicación encontrada.
 */
export const getDireccionUbicacion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const direccionUbicacion = await DireccionUbicacion.findByPk(id);
        if (!direccionUbicacion) {
            return res.status(404).json({
                ok: false,
                msg: 'Dirección de ciudad no encontrada'
            });
        }
        res.json({
            ok: true,
            msg: 'Dirección encontrada',
            direccionUbicacion
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener la dirección de ciudad'
        });
    }
};

/**
 * Actualiza una dirección de ciudad existente.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 * @returns Una respuesta HTTP con la dirección de ubicación actualizada.
 */
export const updateDireccionUbicacion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const direccionUbicacion = await DireccionUbicacion.findByPk(id);
        if (!direccionUbicacion) {
            res.status(404).json({
                ok: false,
                msg: 'Dirección de ciudad no encontrada'
            });
            return;
        }
        await direccionUbicacion.update(req.body);
        res.json({
            ok: true,
            msg: 'direccion actualizada correctamente',
            direccionUbicacion
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la dirección de ciudad'
        });
    }
};

/**
 * Elimina una dirección de ubicación existente.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 * @returns Una respuesta HTTP con un mensaje de éxito.
 */
export const deleteDireccionUbicacion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const direccionUbicacion = await DireccionUbicacion.findByPk(id);
        if (!direccionUbicacion) {
            return res.status(404).json({
                ok: false,
                msg: 'Dirección de ciudad no encontrada'
            });
        }
        await direccionUbicacion.destroy();
        res.json({
            ok: true,
            msg: 'Dirección de ciudad eliminada correctamente',
            direccionUbicacion
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la dirección de ciudad'
        });
    }
};

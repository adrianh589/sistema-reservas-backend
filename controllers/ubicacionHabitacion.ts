import { Request, Response } from 'express';
import UbicacionHabitacion from '../models/ubicacionHabitacion';

/**
 * Controlador para obtener todas las ubicaciones de habitaciones.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con las ubicaciones de habitaciones encontradas.
 */
export const getUbicacionesHabitaciones = async (req: Request, res: Response) => {
    try {
        const ubicaciones = await UbicacionHabitacion.findAll();
        res.json({
            msg: 'Ubicaciones de habitaciones encontradas',
            ubicaciones,
        });
    } catch (error) {
        console.error('Error al obtener las ubicaciones de habitaciones:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener las ubicaciones de habitaciones',
        });
    }
}

/**
 * Controlador para obtener una ubicación de habitación por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la ubicación de habitación encontrada.
 */
export const getUbicacionHabitacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const ubicacion = await UbicacionHabitacion.findByPk(id);
        if (!ubicacion) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró una ubicación de habitación con el ID ${id}`,
            });
        }
        res.json({
            ok: true,
            msg: 'Ubicación de habitación encontrada',
            ubicacion,
        });
    } catch (error) {
        console.error('Error al obtener la ubicación de habitación:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener la ubicación de habitación',
        });
    }
}

/**
 * Controlador para crear una nueva ubicación de habitación.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la ubicación de habitación creada.
 */
export const crearUbicacionHabitacion = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const ubicacion = await UbicacionHabitacion.create(body);
        res.status(201).json({
            ok: true,
            msg: 'Ubicación de habitación creada correctamente',
            ubicacion,
        });
    } catch (error) {
        console.error('Error al crear la ubicación de habitación:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear la ubicación de habitación',
        });
    }
}

/**
 * Controlador para actualizar una ubicación de habitación existente por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la ubicación de habitación actualizada.
 */
export const actualizarUbicacionHabitacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const ubicacion = await UbicacionHabitacion.findByPk(id);
        if (!ubicacion) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró una ubicación de habitación con el ID ${id}`,
            });
        }
        await ubicacion.update(body);
        res.json({
            ok: true,
            msg: 'Ubicación de habitación actualizada correctamente',
            ubicacion,
        });
    } catch (error) {
        console.error('Error al actualizar la ubicación de habitación:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar la ubicación de habitación',
        });
    }
}

/**
 * Controlador para eliminar una ubicación de habitación por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la ubicación de habitación eliminada.
 */
export const eliminarUbicacionHabitacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const ubicacion = await UbicacionHabitacion.findByPk(id);
        if (!ubicacion) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró una ubicación de habitación con el ID ${id}`,
            });
        }
        await ubicacion.destroy();
        res.json({
            ok: true,
            msg: 'Ubicación de habitación eliminada correctamente',
            ubicacion,
        });
    } catch (error) {
        console.error('Error al eliminar la ubicación de habitación:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al eliminar la ubicación de habitación',
        });
    }
}

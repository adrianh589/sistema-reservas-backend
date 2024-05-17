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
        const ciudades = await UbicacionHabitacion.findAll();
        res.json({
            msg: 'Ciudades de habitaciones encontradas',
            ciudades,
        });
    } catch (error) {
        console.error('Error al obtener las Ciudades de habitaciones:', error);
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
        const ciudad = await UbicacionHabitacion.findByPk(id);
        if (!ciudad) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró una Ciudad de habitación con el ID ${id}`,
            });
        }
        res.json({
            ok: true,
            msg: 'Ciudad de habitación encontrada',
            ciudad,
        });
    } catch (error) {
        console.error('Error al obtener la Ciudad de habitación:', error);
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
        const ciudad = await UbicacionHabitacion.create(body);
        res.status(201).json({
            ok: true,
            msg: 'Ciudad de habitación creada correctamente',
            ciudad,
        });
    } catch (error) {
        console.error('Error al crear la Ciudad de habitación:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear la Ciudad de habitación',
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
        const ciudad = await UbicacionHabitacion.findByPk(id);
        if (!ciudad) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró una Ciudad de habitación con el ID ${id}`,
            });
        }
        await ciudad.update(body);
        res.json({
            ok: true,
            msg: 'Ciudad de habitación actualizada correctamente',
            ciudad,
        });
    } catch (error) {
        console.error('Error al actualizar la Ciudad de habitación:', error);
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
        const ciudad = await UbicacionHabitacion.findByPk(id);
        if (!ciudad) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró una Ciudad de habitación con el ID ${id}`,
            });
        }
        await ciudad.destroy();
        res.json({
            ok: true,
            msg: 'Ciudad de habitación eliminada correctamente',
            ciudad,
        });
    } catch (error) {
        console.error('Error al eliminar la Ciudad de habitación:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al eliminar la Ciudad de habitación',
        });
    }
}

import { Request, Response } from 'express';
import Habitacion from '../models/habitacion';

/**
 * Controladores para gestionar las habitaciones.
 */

/**
 * Obtiene todas las habitaciones registradas en el sistema.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la lista de habitaciones.
 */
export const getHabitaciones = async (req: Request, res: Response) => {
    try {
        const habitaciones = await Habitacion.findAll();
        res.json({
            msg: 'Habitaciones encontradas',
            habitaciones
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
}

/**
 * Obtiene una habitación específica según su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la habitación encontrada.
 */
export const getHabitacion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const habitacion = await Habitacion.findByPk(id);
        if (!habitacion) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una habitación con el id: ${id}`
            });
        }
        res.json({
            ok: true,
            msg: 'Habitación encontrada',
            habitacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
}

/**
 * Crea una nueva habitación en el sistema.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la habitación creada.
 */
export const crearHabitacion = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const habitacion = await Habitacion.create(body);
        res.json({
            ok: true,
            msg: 'Habitación creada correctamente',
            habitacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
}

/**
 * Actualiza una habitación existente por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la habitación actualizada.
 */
export const actualizarHabitacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const habitacion = await Habitacion.findByPk(id);
        if (!habitacion) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una habitación con el id: ${id}`
            });
        }
        await habitacion.update(body);
        res.json({
            ok: true,
            msg: `Habitación actualizada correctamente`,
            habitacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
}

/**
 * Elimina una habitación existente por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la habitación eliminada.
 */
export const eliminarHabitacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const habitacion = await Habitacion.findByPk(id);
        if (!habitacion) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una habitación con el id: ${id}`
            });
        }
        await habitacion.destroy();
        res.json({
            ok: true,
            msg: `Habitación eliminada correctamente`,
            habitacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
}

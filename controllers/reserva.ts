import { Request, Response } from 'express';
import Reserva from '../models/reserva';

/**
 * Controladores para gestionar las reservas.
 */

/**
 * Obtiene todas las reservas.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con todas las reservas.
 */
export const getReservas = async (req: Request, res: Response) => {
    try {
        const reservas = await Reserva.findAll();
        return res.json({
            ok: true,
            msg: 'Reservas encontradas',
            reservas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
};

/**
 * Obtiene una reserva por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la reserva encontrada.
 */
export const getReserva = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const reserva = await Reserva.findByPk(id);
        if (!reserva) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una reserva con el ID ${id}`
            });
        }
        return res.json({
            ok: true,
            msg: 'Reserva encontrada',
            reserva
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
};

/**
 * Crea una nueva reserva.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la reserva creada.
 */
export const crearReserva = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        // Verificar que la fecha de fin sea posterior a la fecha de inicio
        const fechaInicio = new Date(body.fecha_inicio_reserva);
        const fechaFin = new Date(body.fecha_fin_reserva);

        if (fechaFin <= fechaInicio) {
            return res.status(400).json({
                ok: false,
                msg: 'La fecha de fin de la reserva debe ser posterior a la fecha de inicio'
            });
        }

        const nuevaReserva = await Reserva.create(body);
        return res.json({
            ok: true,
            msg: 'Reserva creada correctamente',
            reserva: nuevaReserva
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
};

/**
 * Actualiza una reserva existente por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la reserva actualizada.
 */
export const actualizarReserva = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const reserva = await Reserva.findByPk(id);
        if (!reserva) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una reserva con el ID ${id}`
            });
        }
        await reserva.update(body);
        return res.json({
            ok: true,
            msg: 'Reserva actualizada correctamente',
            reserva
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
};

/**
 * Elimina una reserva por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la reserva eliminada.
 */
export const eliminarReserva = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const reserva = await Reserva.findByPk(id);
        if (!reserva) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una reserva con el ID ${id}`
            });
        }
        await reserva.destroy();
        return res.json({
            ok: true,
            msg: 'Reserva eliminada correctamente',
            reserva
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
};

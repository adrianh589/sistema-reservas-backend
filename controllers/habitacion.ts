import { Request, Response } from 'express';
import Habitacion, {HabitacionAttributes, HabitacionClass} from '../models/habitacion';
import Hotel from "../models/hotel";
import TipoHabitacion from "../models/tipoHabitacion";
import UbicacionHabitacion from "../models/ubicacionHabitacion";
import {Op, Sequelize} from "sequelize";

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
        const habitaciones = await Habitacion.findAll({ include: [ Hotel, TipoHabitacion, UbicacionHabitacion ] });
        res.json({
            ok: true,
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
        const habitacion = await Habitacion.findByPk(id, { include: [ Hotel, TipoHabitacion, UbicacionHabitacion ] });
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

        // Buscar si ya existe una habitación con el mismo número para el hotel
        const habitacionExistente = await Habitacion.findOne({
            where: {
                numero_habitacion: body.numero_habitacion,
                id_hotel: body.id_hotel
            }
        });

        if (habitacionExistente) {
            return res.status(409).json({
                ok: false,
                msg: 'Ya existe una habitación con el mismo número de habitación para este hotel'
            });
        }

        const habitacion = await Habitacion.create(body);
        return res.json({
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

/**
 * Controlador para obtener las habitaciones disponibles según las fechas de entrada y salida y opcionalmente la ciudad.
 */
export const getHabitacionesDisponibles = async (req: Request, res: Response) => {
    const { fechaEntrada, fechaSalida, ciudad } = req.body;

    try {
        // Definir las condiciones de la consulta
        const condiciones: any = {
            id: {
                [Op.notIn]: [
                    Sequelize.literal(`
                        SELECT id_habitacion
                        FROM Reservas
                        WHERE fecha_fin_reserva >= '${fechaEntrada}' AND fecha_inicio_reserva <= '${fechaSalida}'
                    `)
                ]
            },
            habilitado: true // Asegurarse de que la habitación esté habilitada
        };

        // Consultar las habitaciones que cumplen con las condiciones
        let habitacionesDisponibles: any = await Habitacion.findAll({
            where: condiciones,
            include: [
                {
                    model: Hotel,
                    where: { habilitado: true }, // Asegurarse de que el hotel esté habilitado
                },
                TipoHabitacion,
                UbicacionHabitacion
            ]
        });

        if (ciudad) {
            habitacionesDisponibles = habitacionesDisponibles.filter( (habitacion: HabitacionAttributes) => habitacion.id_ubicacion_habitacion == ciudad );
        }

        res.json({
            ok: true,
            msg: 'Habitaciones disponibles encontradas',
            habitacionesDisponibles
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
};

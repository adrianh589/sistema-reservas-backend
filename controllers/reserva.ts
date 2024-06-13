import { Request, Response } from 'express';
import Reserva from '../models/reserva';
import Reservista, {ReservistaClass} from "../models/reservista";
import Habitacion from "../models/habitacion";
import ContactoEmergencia from "../models/contactoEmergencia";
import Huesped from "../models/huesped";
import {enviarEmailTest} from "./sendEmailTest";
import SendMailer from "../helpers/sendMailer";
import path from "path";

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
        const reservas = await Reserva.findAll({
            include: [Habitacion, Reservista, ContactoEmergencia]
        });
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
        const reserva = await Reserva.findByPk(id, {
            include: [Habitacion, Reservista, ContactoEmergencia]
        });
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
    try {
        const { reserva, habitacion } = req.body;

        // Verificar que la fecha de fin sea posterior a la fecha de inicio
        const fechaInicio = new Date(reserva.fecha_inicio_reserva);
        const fechaFin = new Date(reserva.fecha_fin_reserva);

        if (fechaFin < fechaInicio) {
            return res.status(400).json({
                ok: false,
                msg: 'La fecha de fin de la reserva debe ser posterior a la fecha de inicio'
            });
        }

        // Crear el reservista
        // Asegurarnos de tener el ID del reservista
        let reservista = await Reservista.findOne({ where: { numero_documento: reserva.reservista.numero_documento } });
        if (!reservista){
            reservista = await Reservista.create(reserva.reservista);
        }

        // Crear el contacto de emergencia
        const nuevoContactoEmergencia = await ContactoEmergencia.create(reserva.contacto_emergencia);

        // Crear la nueva reserva
        const nuevaReserva = await Reserva.create({
            id_reservista: reservista.id,
            id_contacto_emergencia: nuevoContactoEmergencia.id,
            fecha_inicio_reserva: reserva.fecha_inicio_reserva,
            fecha_fin_reserva : reserva.fecha_fin_reserva,
            id_habitacion: habitacion.id,
            cantidad_personas: reserva.cantidad_personas,
        });

        // Crear los huéspedes
        const nuevosHuespedes = await Promise.all(reserva.huespedes.map(async (huesped: any) => {
            return await Huesped.create({...huesped, id_reservista: reservista.id, id_reserva: reservista.id});
        }));

        /**
         * Inicio, proceso de enviar email
         */
        const sendMailer = new SendMailer();

        // Datos de la reserva
        const reservaTemplate = {
            reservista: { nombres: reserva.reservista.nombres },
            hotel: { nombre: habitacion.Hotel.nombre },
            fecha_inicio_reserva: reserva.fecha_inicio_reserva,
            fecha_fin_reserva: reserva.fecha_fin_reserva,
            numero_habitacion: habitacion.numero_habitacion,
            huespedes: [reserva.huespedes] // Suponiendo que hay 3 huéspedes
        };

        // Enviar correo de confirmación
        sendMailer.sendTemplateEmail(
            reserva.reservista.correo,
            'Confirmación de Reserva',
            path.resolve('./templates/reserva-confirmacion.html'),
            {
                nombresReservista: reservaTemplate.reservista.nombres,
                nombreHotel: reservaTemplate.hotel.nombre,
                fechaInicioReserva: reservaTemplate.fecha_inicio_reserva,
                fechaFinReserva: reservaTemplate.fecha_fin_reserva,
                numeroHabitacion: reservaTemplate.numero_habitacion,
                cantidadHuespedes: reservaTemplate.huespedes.length
            }
        );

        return res.json({
            ok: true,
            msg: 'Reserva creada correctamente, se ha enviado un email de confirmación al correo del reservista, porfavor revisar la categoría SPAM, muchas gracias.',
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

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarReserva = exports.actualizarReserva = exports.crearReserva = exports.getReserva = exports.getReservas = void 0;
const reserva_1 = __importDefault(require("../models/reserva"));
const reservista_1 = __importDefault(require("../models/reservista"));
const habitacion_1 = __importDefault(require("../models/habitacion"));
const contactoEmergencia_1 = __importDefault(require("../models/contactoEmergencia"));
const huesped_1 = __importDefault(require("../models/huesped"));
const sendMailer_1 = __importDefault(require("../helpers/sendMailer"));
const path_1 = __importDefault(require("path"));
/**
 * Controladores para gestionar las reservas.
 */
/**
 * Obtiene todas las reservas.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con todas las reservas.
 */
const getReservas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservas = yield reserva_1.default.findAll({
            include: [habitacion_1.default, reservista_1.default, contactoEmergencia_1.default]
        });
        return res.json({
            ok: true,
            msg: 'Reservas encontradas',
            reservas
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
});
exports.getReservas = getReservas;
/**
 * Obtiene una reserva por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la reserva encontrada.
 */
const getReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const reserva = yield reserva_1.default.findByPk(id, {
            include: [habitacion_1.default, reservista_1.default, contactoEmergencia_1.default]
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
});
exports.getReserva = getReserva;
/**
 * Crea una nueva reserva.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la reserva creada.
 */
const crearReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let reservista = yield reservista_1.default.findOne({ where: { numero_documento: reserva.reservista.numero_documento } });
        if (!reservista) {
            reservista = yield reservista_1.default.create(reserva.reservista);
        }
        // Crear el contacto de emergencia
        const nuevoContactoEmergencia = yield contactoEmergencia_1.default.create(reserva.contacto_emergencia);
        // Crear la nueva reserva
        const nuevaReserva = yield reserva_1.default.create({
            id_reservista: reservista.id,
            id_contacto_emergencia: nuevoContactoEmergencia.id,
            fecha_inicio_reserva: reserva.fecha_inicio_reserva,
            fecha_fin_reserva: reserva.fecha_fin_reserva,
            id_habitacion: habitacion.id,
            cantidad_personas: reserva.cantidad_personas,
        });
        // Crear los huéspedes
        const nuevosHuespedes = yield Promise.all(reserva.huespedes.map((huesped) => __awaiter(void 0, void 0, void 0, function* () {
            return yield huesped_1.default.create(Object.assign(Object.assign({}, huesped), { id_reservista: reservista.id, id_reserva: reservista.id }));
        })));
        /**
         * Inicio, proceso de enviar email
         */
        const sendMailer = new sendMailer_1.default();
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
        sendMailer.sendTemplateEmail(reserva.reservista.correo, 'Confirmación de Reserva', path_1.default.resolve('./templates/reserva-confirmacion.html'), {
            nombresReservista: reservaTemplate.reservista.nombres,
            nombreHotel: reservaTemplate.hotel.nombre,
            fechaInicioReserva: reservaTemplate.fecha_inicio_reserva,
            fechaFinReserva: reservaTemplate.fecha_fin_reserva,
            numeroHabitacion: reservaTemplate.numero_habitacion,
            cantidadHuespedes: reservaTemplate.huespedes.length
        });
        return res.json({
            ok: true,
            msg: 'Reserva creada correctamente, se ha enviado un email de confirmación al correo del reservista, porfavor revisar la categoría SPAM, muchas gracias.',
            reserva: nuevaReserva
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
});
exports.crearReserva = crearReserva;
/**
 * Actualiza una reserva existente por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la reserva actualizada.
 */
const actualizarReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const reserva = yield reserva_1.default.findByPk(id);
        if (!reserva) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una reserva con el ID ${id}`
            });
        }
        yield reserva.update(body);
        return res.json({
            ok: true,
            msg: 'Reserva actualizada correctamente',
            reserva
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
});
exports.actualizarReserva = actualizarReserva;
/**
 * Elimina una reserva por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la reserva eliminada.
 */
const eliminarReserva = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const reserva = yield reserva_1.default.findByPk(id);
        if (!reserva) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una reserva con el ID ${id}`
            });
        }
        yield reserva.destroy();
        return res.json({
            ok: true,
            msg: 'Reserva eliminada correctamente',
            reserva
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
});
exports.eliminarReserva = eliminarReserva;
//# sourceMappingURL=reserva.js.map
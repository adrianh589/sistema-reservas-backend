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
exports.getHabitacionesDisponibles = exports.eliminarHabitacion = exports.actualizarHabitacion = exports.crearHabitacion = exports.getHabitacion = exports.getHabitaciones = void 0;
const habitacion_1 = __importDefault(require("../models/habitacion"));
const hotel_1 = __importDefault(require("../models/hotel"));
const tipoHabitacion_1 = __importDefault(require("../models/tipoHabitacion"));
const ubicacionHabitacion_1 = __importDefault(require("../models/ubicacionHabitacion"));
const sequelize_1 = require("sequelize");
/**
 * Controladores para gestionar las habitaciones.
 */
/**
 * Obtiene todas las habitaciones registradas en el sistema.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la lista de habitaciones.
 */
const getHabitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const habitaciones = yield habitacion_1.default.findAll({ include: [hotel_1.default, tipoHabitacion_1.default, ubicacionHabitacion_1.default] });
        res.json({
            ok: true,
            msg: 'Habitaciones encontradas',
            habitaciones
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
exports.getHabitaciones = getHabitaciones;
/**
 * Obtiene una habitación específica según su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la habitación encontrada.
 */
const getHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const habitacion = yield habitacion_1.default.findByPk(id, { include: [hotel_1.default, tipoHabitacion_1.default, ubicacionHabitacion_1.default] });
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
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
});
exports.getHabitacion = getHabitacion;
/**
 * Crea una nueva habitación en el sistema.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la habitación creada.
 */
const crearHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        // Buscar si ya existe una habitación con el mismo número para el hotel
        const habitacionExistente = yield habitacion_1.default.findOne({
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
        const habitacion = yield habitacion_1.default.create(body);
        return res.json({
            ok: true,
            msg: 'Habitación creada correctamente',
            habitacion
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
exports.crearHabitacion = crearHabitacion;
/**
 * Actualiza una habitación existente por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la habitación actualizada.
 */
const actualizarHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const habitacion = yield habitacion_1.default.findByPk(id);
        if (!habitacion) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una habitación con el id: ${id}`
            });
        }
        yield habitacion.update(body);
        res.json({
            ok: true,
            msg: `Habitación actualizada correctamente`,
            habitacion
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
exports.actualizarHabitacion = actualizarHabitacion;
/**
 * Elimina una habitación existente por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la habitación eliminada.
 */
const eliminarHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const habitacion = yield habitacion_1.default.findByPk(id);
        if (!habitacion) {
            return res.status(404).json({
                ok: false,
                msg: `No existe una habitación con el id: ${id}`
            });
        }
        yield habitacion.destroy();
        res.json({
            ok: true,
            msg: `Habitación eliminada correctamente`,
            habitacion
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
exports.eliminarHabitacion = eliminarHabitacion;
/**
 * Controlador para obtener las habitaciones disponibles según las fechas de entrada y salida y opcionalmente la ciudad.
 */
const getHabitacionesDisponibles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fechaEntrada, fechaSalida, ciudad } = req.body;
    try {
        // Definir las condiciones de la consulta
        const condiciones = {
            id: {
                [sequelize_1.Op.notIn]: [
                    sequelize_1.Sequelize.literal(`
                        SELECT id_habitacion
                        FROM Reservas
                        WHERE fecha_fin_reserva >= '${fechaEntrada}' AND fecha_inicio_reserva <= '${fechaSalida}'
                    `)
                ]
            },
            habilitado: true // Asegurarse de que la habitación esté habilitada
        };
        // Consultar las habitaciones que cumplen con las condiciones
        let habitacionesDisponibles = yield habitacion_1.default.findAll({
            where: condiciones,
            include: [
                {
                    model: hotel_1.default,
                    where: { habilitado: true }, // Asegurarse de que el hotel esté habilitado
                },
                tipoHabitacion_1.default,
                ubicacionHabitacion_1.default
            ]
        });
        if (ciudad) {
            habitacionesDisponibles = habitacionesDisponibles.filter((habitacion) => habitacion.id_ubicacion_habitacion == ciudad);
        }
        res.json({
            ok: true,
            msg: 'Habitaciones disponibles encontradas',
            habitacionesDisponibles
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
exports.getHabitacionesDisponibles = getHabitacionesDisponibles;
//# sourceMappingURL=habitacion.js.map
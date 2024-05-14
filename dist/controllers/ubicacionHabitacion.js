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
exports.eliminarUbicacionHabitacion = exports.actualizarUbicacionHabitacion = exports.crearUbicacionHabitacion = exports.getUbicacionHabitacion = exports.getUbicacionesHabitaciones = void 0;
const ubicacionHabitacion_1 = __importDefault(require("../models/ubicacionHabitacion"));
/**
 * Controlador para obtener todas las ubicaciones de habitaciones.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con las ubicaciones de habitaciones encontradas.
 */
const getUbicacionesHabitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ubicaciones = yield ubicacionHabitacion_1.default.findAll();
        res.json({
            msg: 'Ubicaciones de habitaciones encontradas',
            ubicaciones,
        });
    }
    catch (error) {
        console.error('Error al obtener las ubicaciones de habitaciones:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener las ubicaciones de habitaciones',
        });
    }
});
exports.getUbicacionesHabitaciones = getUbicacionesHabitaciones;
/**
 * Controlador para obtener una ubicación de habitación por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la ubicación de habitación encontrada.
 */
const getUbicacionHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ubicacion = yield ubicacionHabitacion_1.default.findByPk(id);
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
    }
    catch (error) {
        console.error('Error al obtener la ubicación de habitación:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener la ubicación de habitación',
        });
    }
});
exports.getUbicacionHabitacion = getUbicacionHabitacion;
/**
 * Controlador para crear una nueva ubicación de habitación.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la ubicación de habitación creada.
 */
const crearUbicacionHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const ubicacion = yield ubicacionHabitacion_1.default.create(body);
        res.status(201).json({
            ok: true,
            msg: 'Ubicación de habitación creada correctamente',
            ubicacion,
        });
    }
    catch (error) {
        console.error('Error al crear la ubicación de habitación:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear la ubicación de habitación',
        });
    }
});
exports.crearUbicacionHabitacion = crearUbicacionHabitacion;
/**
 * Controlador para actualizar una ubicación de habitación existente por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la ubicación de habitación actualizada.
 */
const actualizarUbicacionHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const ubicacion = yield ubicacionHabitacion_1.default.findByPk(id);
        if (!ubicacion) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró una ubicación de habitación con el ID ${id}`,
            });
        }
        yield ubicacion.update(body);
        res.json({
            ok: true,
            msg: 'Ubicación de habitación actualizada correctamente',
            ubicacion,
        });
    }
    catch (error) {
        console.error('Error al actualizar la ubicación de habitación:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar la ubicación de habitación',
        });
    }
});
exports.actualizarUbicacionHabitacion = actualizarUbicacionHabitacion;
/**
 * Controlador para eliminar una ubicación de habitación por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la ubicación de habitación eliminada.
 */
const eliminarUbicacionHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const ubicacion = yield ubicacionHabitacion_1.default.findByPk(id);
        if (!ubicacion) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró una ubicación de habitación con el ID ${id}`,
            });
        }
        yield ubicacion.destroy();
        res.json({
            ok: true,
            msg: 'Ubicación de habitación eliminada correctamente',
            ubicacion,
        });
    }
    catch (error) {
        console.error('Error al eliminar la ubicación de habitación:', error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al eliminar la ubicación de habitación',
        });
    }
});
exports.eliminarUbicacionHabitacion = eliminarUbicacionHabitacion;
//# sourceMappingURL=ubicacionHabitacion.js.map
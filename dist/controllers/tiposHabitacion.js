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
exports.eliminarTipoHabitacion = exports.actualizarTipoHabitacion = exports.crearTipoHabitacion = exports.getTipoHabitacion = exports.getTiposHabitaciones = void 0;
const tipoHabitacion_1 = __importDefault(require("../models/tipoHabitacion"));
/**
 * Obtiene todos los tipos de habitaciones.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con los tipos de habitaciones encontrados.
 */
const getTiposHabitaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiposHabitaciones = yield tipoHabitacion_1.default.findAll();
        res.json({
            ok: true,
            msg: 'Tipos de habitaciones encontrados',
            tiposHabitaciones
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los tipos de habitaciones'
        });
    }
});
exports.getTiposHabitaciones = getTiposHabitaciones;
/**
 * Obtiene un tipo de habitación por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el tipo de habitación encontrado.
 */
const getTipoHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tipoHabitacion = yield tipoHabitacion_1.default.findByPk(id);
        if (!tipoHabitacion) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró un tipo de habitación con el id ${id}`
            });
        }
        res.json({
            ok: true,
            msg: 'Tipo de habitación encontrado',
            tipoHabitacion
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener el tipo de habitación'
        });
    }
});
exports.getTipoHabitacion = getTipoHabitacion;
/**
 * Crea un nuevo tipo de habitación.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el tipo de habitación creado.
 */
const crearTipoHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    try {
        const tipoHabitacion = yield tipoHabitacion_1.default.create({ nombre });
        res.json({
            ok: true,
            msg: 'Tipo de habitación creado correctamente',
            tipoHabitacion
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear el tipo de habitación'
        });
    }
});
exports.crearTipoHabitacion = crearTipoHabitacion;
/**
 * Actualiza un tipo de habitación existente por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el tipo de habitación actualizado.
 */
const actualizarTipoHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const tipoHabitacion = yield tipoHabitacion_1.default.findByPk(id);
        if (!tipoHabitacion) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró un tipo de habitación con el id ${id}`
            });
        }
        yield tipoHabitacion.update({ nombre });
        res.json({
            ok: true,
            msg: 'Tipo de habitación actualizado correctamente',
            tipoHabitacion
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar el tipo de habitación'
        });
    }
});
exports.actualizarTipoHabitacion = actualizarTipoHabitacion;
/**
 * Elimina un tipo de habitación por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON indicando si se eliminó el tipo de habitación correctamente.
 */
const eliminarTipoHabitacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tipoHabitacion = yield tipoHabitacion_1.default.findByPk(id);
        if (!tipoHabitacion) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró un tipo de habitación con el id ${id}`
            });
        }
        yield tipoHabitacion.destroy();
        res.json({
            ok: true,
            msg: 'Tipo de habitación eliminado correctamente',
            tipoHabitacion
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al eliminar el tipo de habitación'
        });
    }
});
exports.eliminarTipoHabitacion = eliminarTipoHabitacion;
//# sourceMappingURL=tiposHabitacion.js.map
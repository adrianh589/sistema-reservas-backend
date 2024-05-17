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
exports.deleteDireccionUbicacion = exports.updateDireccionUbicacion = exports.getDireccionUbicacionById = exports.createDireccionUbicacion = exports.getDireccionesUbicaciones = void 0;
const direccionUbicacion_1 = __importDefault(require("../models/direccionUbicacion"));
/**
 * Obtiene todas las direcciones de ubicaciones.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 * @returns Una respuesta HTTP con todas las direcciones de ubicaciones.
 */
const getDireccionesUbicaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const direccionesUbicaciones = yield direccionUbicacion_1.default.findAll();
        res.json(direccionesUbicaciones);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener las direcciones de ubicaciones' });
    }
});
exports.getDireccionesUbicaciones = getDireccionesUbicaciones;
/**
 * Crea una nueva dirección de ubicación.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 * @returns Una respuesta HTTP con la nueva dirección de ubicación creada.
 */
const createDireccionUbicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nuevaDireccionUbicacion = yield direccionUbicacion_1.default.create(req.body);
        res.status(201).json(nuevaDireccionUbicacion);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear la dirección de ubicación' });
    }
});
exports.createDireccionUbicacion = createDireccionUbicacion;
/**
 * Obtiene una dirección de ubicación por su ID.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 * @returns Una respuesta HTTP con la dirección de ubicación encontrada.
 */
const getDireccionUbicacionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const direccionUbicacion = yield direccionUbicacion_1.default.findByPk(id);
        if (!direccionUbicacion) {
            res.status(404).json({ message: 'Dirección de ubicación no encontrada' });
            return;
        }
        res.json(direccionUbicacion);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener la dirección de ubicación' });
    }
});
exports.getDireccionUbicacionById = getDireccionUbicacionById;
/**
 * Actualiza una dirección de ubicación existente.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 * @returns Una respuesta HTTP con la dirección de ubicación actualizada.
 */
const updateDireccionUbicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const direccionUbicacion = yield direccionUbicacion_1.default.findByPk(id);
        if (!direccionUbicacion) {
            res.status(404).json({ message: 'Dirección de ubicación no encontrada' });
            return;
        }
        yield direccionUbicacion.update(req.body);
        res.json(direccionUbicacion);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar la dirección de ubicación' });
    }
});
exports.updateDireccionUbicacion = updateDireccionUbicacion;
/**
 * Elimina una dirección de ubicación existente.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 * @returns Una respuesta HTTP con un mensaje de éxito.
 */
const deleteDireccionUbicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const direccionUbicacion = yield direccionUbicacion_1.default.findByPk(id);
        if (!direccionUbicacion) {
            res.status(404).json({ message: 'Dirección de ubicación no encontrada' });
            return;
        }
        yield direccionUbicacion.destroy();
        res.json({ message: 'Dirección de ubicación eliminada correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar la dirección de ubicación' });
    }
});
exports.deleteDireccionUbicacion = deleteDireccionUbicacion;
//# sourceMappingURL=direccionHabitacion.js.map
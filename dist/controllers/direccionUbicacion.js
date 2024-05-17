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
exports.deleteDireccionUbicacion = exports.updateDireccionUbicacion = exports.getDireccionUbicacion = exports.createDireccionUbicacion = exports.getDireccionesUbicaciones = void 0;
const direccionUbicacion_1 = __importDefault(require("../models/direccionUbicacion"));
/**
 * Obtiene todas las direcciones de ciudades.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 * @returns Una respuesta HTTP con todas las direcciones de ubicaciones.
 */
const getDireccionesUbicaciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const direccionesUbicaciones = yield direccionUbicacion_1.default.findAll();
        res.json({
            ok: true,
            msg: 'Direcciones de ciudades encontradas',
            direccionesUbicaciones
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Error al obtener las direcciones de ciudades'
        });
    }
});
exports.getDireccionesUbicaciones = getDireccionesUbicaciones;
/**
 * Crea una nueva dirección de ciudad.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 * @returns Una respuesta HTTP con la nueva dirección de ubicación creada.
 */
const createDireccionUbicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verificar si ya existe un hotel con el mismo nombre
        const direccionUbicacionExistente = yield direccionUbicacion_1.default.findOne({ where: req.body });
        if (direccionUbicacionExistente) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un direccion denominada'
            });
        }
        const direccionUbicacion = yield direccionUbicacion_1.default.create(req.body);
        res.status(201).json({
            ok: true,
            msg: 'Direccion creada correctamente',
            direccionUbicacion
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la dirección de ciudad'
        });
    }
});
exports.createDireccionUbicacion = createDireccionUbicacion;
/**
 * Obtiene una dirección de ciudad por su ID.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 * @returns Una respuesta HTTP con la dirección de ubicación encontrada.
 */
const getDireccionUbicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const direccionUbicacion = yield direccionUbicacion_1.default.findByPk(id);
        if (!direccionUbicacion) {
            return res.status(404).json({
                ok: false,
                msg: 'Dirección de ciudad no encontrada'
            });
        }
        res.json({
            ok: true,
            msg: 'Dirección encontrada',
            direccionUbicacion
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener la dirección de ciudad'
        });
    }
});
exports.getDireccionUbicacion = getDireccionUbicacion;
/**
 * Actualiza una dirección de ciudad existente.
 * @param req La solicitud HTTP entrante.
 * @param res La respuesta HTTP saliente.
 * @returns Una respuesta HTTP con la dirección de ubicación actualizada.
 */
const updateDireccionUbicacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const direccionUbicacion = yield direccionUbicacion_1.default.findByPk(id);
        if (!direccionUbicacion) {
            res.status(404).json({
                ok: false,
                msg: 'Dirección de ciudad no encontrada'
            });
            return;
        }
        yield direccionUbicacion.update(req.body);
        res.json({
            ok: true,
            msg: 'direccion actualizada correctamente',
            direccionUbicacion
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar la dirección de ciudad'
        });
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
            return res.status(404).json({
                ok: false,
                msg: 'Dirección de ciudad no encontrada'
            });
        }
        yield direccionUbicacion.destroy();
        res.json({
            ok: true,
            msg: 'Dirección de ciudad eliminada correctamente',
            direccionUbicacion
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar la dirección de ciudad'
        });
    }
});
exports.deleteDireccionUbicacion = deleteDireccionUbicacion;
//# sourceMappingURL=direccionUbicacion.js.map
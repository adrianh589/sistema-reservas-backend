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
exports.eliminarTipoDocumento = exports.actualizarTipoDocumento = exports.crearTipoDocumento = exports.getTipoDocumento = exports.getTiposDocumento = void 0;
const tipoDocumento_1 = __importDefault(require("../models/tipoDocumento"));
/**
 * Obtiene todos los tipos de documentos.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con los tipos de documentos encontrados.
 */
const getTiposDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tiposDocumento = yield tipoDocumento_1.default.findAll();
        return res.json({
            ok: true,
            msg: 'Tipos de documentos encontrados',
            tiposDocumento
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los tipos de documento.'
        });
    }
});
exports.getTiposDocumento = getTiposDocumento;
/**
 * Obtiene un tipo de documento por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el tipo de documento encontrado.
 */
const getTipoDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const tipoDocumento = yield tipoDocumento_1.default.findByPk(id);
        if (!tipoDocumento) {
            return res.json({
                ok: true,
                msg: `No se encontro un tipo de documento por el id: ${id}`
            });
        }
        return res.json({
            ok: true,
            msg: 'Tipo documento encontrado',
            tipoDocumento
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener el tipo de documento.'
        });
    }
});
exports.getTipoDocumento = getTipoDocumento;
/**
 * Crea un nuevo tipo de documento.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el tipo de documento creado.
 */
const crearTipoDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeTipoDocumento = yield tipoDocumento_1.default.findOne({ where: { tipo: body.tipo } });
        if (existeTipoDocumento) {
            return res.status(409).json({
                ok: false,
                msg: 'Ya existe un tipo de documento con ese nombre'
            });
        }
        const nuevoTipoDocumento = yield tipoDocumento_1.default.create(body);
        res.json({
            ok: true,
            msg: `Tipo de documento creado correctamente`,
            nuevoTipoDocumento
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear el tipo de documento.'
        });
    }
});
exports.crearTipoDocumento = crearTipoDocumento;
/**
 * Actualiza un tipo de documento existente por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el tipo de documento actualizado.
 */
const actualizarTipoDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tipoDocumento = yield tipoDocumento_1.default.findByPk(id);
        if (!tipoDocumento) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró el tipo de documento con id: ${id}`
            });
        }
        yield tipoDocumento.update(req.body);
        res.json({
            ok: true,
            msg: 'Tipo de documento actualizado correctamente',
            tipoDocumentoActualizado: tipoDocumento
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar el tipo de documento.'
        });
    }
});
exports.actualizarTipoDocumento = actualizarTipoDocumento;
/**
 * Elimina un tipo de documento por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON indicando si se eliminó el tipo de documento correctamente.
 */
const eliminarTipoDocumento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tipoDocumento = yield tipoDocumento_1.default.findByPk(id);
        if (!tipoDocumento) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró el tipo de documento.'
            });
        }
        yield tipoDocumento.destroy();
        res.json({
            ok: true,
            msg: 'Tipo de documento eliminado correctamente.'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al eliminar el tipo de documento.'
        });
    }
});
exports.eliminarTipoDocumento = eliminarTipoDocumento;
//# sourceMappingURL=tiposDocumento.js.map
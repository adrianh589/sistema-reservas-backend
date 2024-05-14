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
exports.eliminarHuesped = exports.actualizarHuesped = exports.getHuespedById = exports.crearHuesped = exports.getHuespedes = void 0;
const huesped_1 = __importDefault(require("../models/huesped"));
const reserva_1 = __importDefault(require("../models/reserva"));
const reservista_1 = __importDefault(require("../models/reservista"));
/**
 * Obtener todos los huéspedes.
 */
const getHuespedes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const huespedes = yield huesped_1.default.findAll({
            include: [reserva_1.default, reservista_1.default]
        });
        res.json({
            ok: true,
            msg: 'Huespedes encontrados',
            huespedes
        });
    }
    catch (error) {
        console.error('Error al obtener los huéspedes:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los huéspedes'
        });
    }
});
exports.getHuespedes = getHuespedes;
/**
 * Crear un nuevo huésped.
 */
const crearHuesped = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const huesped = yield huesped_1.default.create(body);
        res.json({
            ok: true,
            msg: 'Huesped creado correctamente',
            huesped
        });
    }
    catch (error) {
        console.error('Error al crear el huésped:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el huésped'
        });
    }
});
exports.crearHuesped = crearHuesped;
/**
 * Obtener un huésped por su ID.
 */
const getHuespedById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const huesped = yield huesped_1.default.findByPk(id);
        if (huesped) {
            res.json({
                ok: true,
                msg: 'Huesped encontrad',
                huesped
            });
        }
        else {
            res.status(404).json({
                ok: false,
                msg: 'Huesped no encontrado'
            });
        }
    }
    catch (error) {
        console.error('Error al obtener el huésped por ID:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener el huésped por ID'
        });
    }
});
exports.getHuespedById = getHuespedById;
/**
 * Actualizar un huésped por su ID.
 */
const actualizarHuesped = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const huesped = yield huesped_1.default.findByPk(id);
        if (huesped) {
            yield huesped.update(body);
            res.json({
                ok: true,
                msg: 'Huesped actualizado correctamente',
                huesped
            });
        }
        else {
            res.status(404).json({
                ok: false,
                msg: 'Huesped no encontrado'
            });
        }
    }
    catch (error) {
        console.error('Error al actualizar el huésped:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el huésped'
        });
    }
});
exports.actualizarHuesped = actualizarHuesped;
/**
 * Eliminar un huésped por su ID.
 */
const eliminarHuesped = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const huesped = yield huesped_1.default.findByPk(id);
        if (huesped) {
            yield huesped.destroy();
            res.json({
                ok: true,
                msg: 'Huesped eliminado correctamente',
                huesped
            });
        }
        else {
            res.status(404).json({
                ok: false,
                msg: 'Huesped no encontrado'
            });
        }
    }
    catch (error) {
        console.error('Error al eliminar el huésped:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el huésped'
        });
    }
});
exports.eliminarHuesped = eliminarHuesped;
//# sourceMappingURL=huespedes.js.map
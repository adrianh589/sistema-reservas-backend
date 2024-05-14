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
exports.eliminarReservista = exports.actualizarReservista = exports.crearReservista = exports.getReservista = exports.getReservistas = void 0;
const reservista_1 = __importDefault(require("../models/reservista"));
// Obtener todos los reservistas
const getReservistas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reservistas = yield reservista_1.default.findAll();
        res.json({
            ok: true,
            msg: 'Reservistas encontrados',
            reservistas
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los reservistas'
        });
    }
});
exports.getReservistas = getReservistas;
// Obtener todos los reservistas
const getReservista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const reservista = yield reservista_1.default.findByPk(id);
        res.json({
            ok: true,
            msg: 'Reservista encontrado',
            reservista
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los reservistas'
        });
    }
});
exports.getReservista = getReservista;
// Crear un nuevo reservista
const crearReservista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const reservista = yield reservista_1.default.create(body);
        res.json({
            ok: true,
            msg: 'Reservista creado exitosamente',
            reservista: reservista
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear el reservista'
        });
    }
});
exports.crearReservista = crearReservista;
// Actualizar un reservista existente
const actualizarReservista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const reservista = yield reservista_1.default.findByPk(id);
        if (!reservista) {
            return res.status(404).json({
                ok: false,
                message: 'Reservista no encontrado'
            });
        }
        yield reservista.update(body);
        res.json({
            ok: true,
            msg: 'Reservista actualizado correctamente',
            reservista
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar el reservista'
        });
    }
});
exports.actualizarReservista = actualizarReservista;
// Eliminar un reservista
const eliminarReservista = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const reservista = yield reservista_1.default.findByPk(id);
        if (!reservista) {
            return res.status(404).json({
                ok: false,
                message: 'Reservista no encontrado'
            });
        }
        yield reservista.destroy();
        res.json({
            ok: true,
            message: 'Reservista eliminado correctamente',
            reservista
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al eliminar el reservista'
        });
    }
});
exports.eliminarReservista = eliminarReservista;
//# sourceMappingURL=reservista.js.map
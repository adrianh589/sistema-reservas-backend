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
exports.eliminarContactoEmergencia = exports.actualizarContactoEmergencia = exports.crearContactoEmergencia = exports.getContactosEmergencia = void 0;
const contactoEmergencia_1 = __importDefault(require("../models/contactoEmergencia"));
// Obtener todos los contactos de emergencia
const getContactosEmergencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactos = yield contactoEmergencia_1.default.findAll();
        res.json({
            ok: true,
            msg: 'Contactos Emergencia encontrados',
            contactos
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Hubo un error al obtener los contactos de emergencia'
        });
    }
});
exports.getContactosEmergencia = getContactosEmergencia;
// Crear un nuevo contacto de emergencia
const crearContactoEmergencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const contacto = yield contactoEmergencia_1.default.create(body);
        res.json({
            ok: true,
            msg: 'Contacto Emergencia creado',
            contacto
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Hubo un error al crear el contacto de emergencia'
        });
    }
});
exports.crearContactoEmergencia = crearContactoEmergencia;
// Actualizar un contacto de emergencia existente
const actualizarContactoEmergencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const contacto = yield contactoEmergencia_1.default.findByPk(id);
        if (!contacto) {
            return res.status(404).json({
                ok: false,
                message: 'Contacto de emergencia no encontrado'
            });
        }
        yield contacto.update(body);
        res.json({
            ok: true,
            msg: 'Contacto emergencia actualizado correctamente',
            contacto
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Hubo un error al actualizar el contacto de emergencia'
        });
    }
});
exports.actualizarContactoEmergencia = actualizarContactoEmergencia;
// Eliminar un contacto de emergencia
const eliminarContactoEmergencia = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const contacto = yield contactoEmergencia_1.default.findByPk(id);
        if (!contacto) {
            return res.status(404).json({
                ok: false,
                message: 'Contacto de emergencia no encontrado'
            });
        }
        yield contacto.destroy();
        res.json({
            ok: true,
            message: 'Contacto de emergencia eliminado correctamente',
            contacto
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Hubo un error al eliminar el contacto de emergencia'
        });
    }
});
exports.eliminarContactoEmergencia = eliminarContactoEmergencia;
//# sourceMappingURL=contactosEmergencia.js.map
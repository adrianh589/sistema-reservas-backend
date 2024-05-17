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
exports.eliminarHotel = exports.actualizarHotel = exports.crearHotel = exports.getHotel = exports.getHoteles = void 0;
const hotel_1 = __importDefault(require("../models/hotel"));
// Obtener todos los hoteles
const getHoteles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hoteles = yield hotel_1.default.findAll();
        res.json({
            ok: true,
            msg: 'Hoteles encontrados',
            hoteles
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los hoteles'
        });
    }
});
exports.getHoteles = getHoteles;
// Obtener un hotel
const getHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const hotel = yield hotel_1.default.findByPk(id);
        res.json({
            ok: true,
            msg: 'Hotel encontrado',
            hotel
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los hoteles'
        });
    }
});
exports.getHotel = getHotel;
// Crear un nuevo hotel
const crearHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        // Verificar si ya existe un hotel con el mismo nombre
        const hotelExistente = yield hotel_1.default.findOne({ where: body });
        if (hotelExistente) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un hotel con el mismo nombre'
            });
        }
        const hotel = yield hotel_1.default.create(body);
        res.json({
            ok: true,
            msg: 'Hotel creado correctamente',
            hotel
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear el hotel'
        });
    }
});
exports.crearHotel = crearHotel;
// Actualizar un hotel existente
const actualizarHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const hotel = yield hotel_1.default.findByPk(id);
        if (!hotel) {
            return res.status(404).json({
                ok: false,
                msg: 'Hotel no encontrado'
            });
        }
        yield hotel.update(body);
        res.json({
            ok: true,
            msg: 'Hotel actualizado correctamente',
            hotel
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar el hotel'
        });
    }
});
exports.actualizarHotel = actualizarHotel;
// Eliminar un hotel
const eliminarHotel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const hotel = yield hotel_1.default.findByPk(id);
        if (!hotel) {
            return res.status(404).json({
                ok: false,
                msg: 'Hotel no encontrado'
            });
        }
        yield hotel.destroy();
        res.json({
            ok: true,
            msg: 'Hotel eliminado correctamente'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al eliminar el hotel'
        });
    }
});
exports.eliminarHotel = eliminarHotel;
//# sourceMappingURL=hoteles.js.map
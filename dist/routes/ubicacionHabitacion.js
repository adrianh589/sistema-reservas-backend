"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ubicacionHabitacion_1 = require("../controllers/ubicacionHabitacion");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = (0, express_1.Router)();
// Rutas para las ciudades
router.get('/', ubicacionHabitacion_1.getUbicacionesHabitaciones);
router.get('/:id', ubicacionHabitacion_1.getUbicacionHabitacion);
router.post('/', validar_jwt_1.default, ubicacionHabitacion_1.crearUbicacionHabitacion);
router.put('/:id', validar_jwt_1.default, ubicacionHabitacion_1.actualizarUbicacionHabitacion);
router.delete('/:id', validar_jwt_1.default, ubicacionHabitacion_1.eliminarUbicacionHabitacion);
exports.default = router;
//# sourceMappingURL=ubicacionHabitacion.js.map
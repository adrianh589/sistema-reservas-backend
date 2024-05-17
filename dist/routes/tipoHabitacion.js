"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tiposHabitacion_1 = require("../controllers/tiposHabitacion");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = (0, express_1.Router)();
// Rutas para los tipos de habitaciones
router.get('/', validar_jwt_1.default, tiposHabitacion_1.getTiposHabitaciones);
router.get('/:id', validar_jwt_1.default, tiposHabitacion_1.getTipoHabitacion);
router.post('/', validar_jwt_1.default, tiposHabitacion_1.crearTipoHabitacion);
router.put('/:id', validar_jwt_1.default, tiposHabitacion_1.actualizarTipoHabitacion);
router.delete('/:id', validar_jwt_1.default, tiposHabitacion_1.eliminarTipoHabitacion);
exports.default = router;
//# sourceMappingURL=tipoHabitacion.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const habitacion_1 = require("../controllers/habitacion");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = (0, express_1.Router)();
/**
 * Rutas para gestionar las habitaciones, solo administradores
 */
// Ruta para obtener todas las habitaciones
router.get('/', validar_jwt_1.default, habitacion_1.getHabitaciones);
// Ruta para obtener una habitación por su ID
router.get('/:id', habitacion_1.getHabitacion);
// Ruta para crear una nueva habitación
router.post('/', validar_jwt_1.default, habitacion_1.crearHabitacion);
// Ruta para actualizar una habitación por su ID
router.put('/:id', validar_jwt_1.default, habitacion_1.actualizarHabitacion);
// Ruta para eliminar una habitación por su ID
router.delete('/:id', validar_jwt_1.default, habitacion_1.eliminarHabitacion);
/**
 * Rutas para los usuarios
 */
router.post('/reservas/disponibles', habitacion_1.getHabitacionesDisponibles);
exports.default = router;
//# sourceMappingURL=habitacion.js.map
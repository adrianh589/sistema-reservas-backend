"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const habitacion_1 = require("../controllers/habitacion");
const router = (0, express_1.Router)();
/**
 * Rutas para gestionar las habitaciones.
 */
// Ruta para obtener todas las habitaciones
router.get('/', habitacion_1.getHabitaciones);
// Ruta para obtener una habitación por su ID
router.get('/:id', habitacion_1.getHabitacion);
// Ruta para crear una nueva habitación
router.post('/', habitacion_1.crearHabitacion);
// Ruta para actualizar una habitación por su ID
router.put('/:id', habitacion_1.actualizarHabitacion);
// Ruta para eliminar una habitación por su ID
router.delete('/:id', habitacion_1.eliminarHabitacion);
exports.default = router;
//# sourceMappingURL=habitacion.js.map
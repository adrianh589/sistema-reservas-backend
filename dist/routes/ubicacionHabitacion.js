"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ubicacionHabitacion_1 = require("../controllers/ubicacionHabitacion");
const router = (0, express_1.Router)();
// Rutas para las ubicaciones de habitaciones
router.get('/', ubicacionHabitacion_1.getUbicacionesHabitaciones);
router.get('/:id', ubicacionHabitacion_1.getUbicacionHabitacion);
router.post('/', ubicacionHabitacion_1.crearUbicacionHabitacion);
router.put('/:id', ubicacionHabitacion_1.actualizarUbicacionHabitacion);
router.delete('/:id', ubicacionHabitacion_1.eliminarUbicacionHabitacion);
exports.default = router;
//# sourceMappingURL=ubicacionHabitacion.js.map
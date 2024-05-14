"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tiposHabitacion_1 = require("../controllers/tiposHabitacion");
const router = (0, express_1.Router)();
// Rutas para los tipos de habitaciones
router.get('/', tiposHabitacion_1.getTiposHabitaciones);
router.get('/:id', tiposHabitacion_1.getTipoHabitacion);
router.post('/', tiposHabitacion_1.crearTipoHabitacion);
router.put('/:id', tiposHabitacion_1.actualizarTipoHabitacion);
router.delete('/:id', tiposHabitacion_1.eliminarTipoHabitacion);
exports.default = router;
//# sourceMappingURL=tipoHabitacion.js.map
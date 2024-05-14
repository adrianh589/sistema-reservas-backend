"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reserva_1 = require("../controllers/reserva");
const router = (0, express_1.Router)();
/**
 * Rutas para gestionar las reservas.
 */
// Obtiene todas las reservas.
router.get('/', reserva_1.getReservas);
// Obtiene una reserva por su ID.
router.get('/:id', reserva_1.getReserva);
// Crea una nueva reserva.
router.post('/', reserva_1.crearReserva);
// Actualiza una reserva por su ID.
router.put('/:id', reserva_1.actualizarReserva);
// Elimina una reserva por su ID.
router.delete('/:id', reserva_1.eliminarReserva);
exports.default = router;
//# sourceMappingURL=reserva.js.map
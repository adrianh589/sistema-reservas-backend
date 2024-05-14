"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const huespedes_1 = require("../controllers/huespedes");
const router = (0, express_1.Router)();
// Rutas para los huéspedes
router.get('/', huespedes_1.getHuespedes);
router.post('/', huespedes_1.crearHuesped);
router.get('/:id', huespedes_1.getHuespedById);
router.put('/:id', huespedes_1.actualizarHuesped);
router.delete('/:id', huespedes_1.eliminarHuesped);
exports.default = router;
//# sourceMappingURL=huesped.js.map
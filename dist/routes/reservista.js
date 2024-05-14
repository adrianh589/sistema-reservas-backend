"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservista_1 = require("../controllers/reservista");
const router = express_1.default.Router();
// Ruta para obtener todos los reservistas
router.get('/', reservista_1.getReservistas);
// Ruta para obtener un reservista
router.get('/', reservista_1.getReservista);
// Ruta para crear un nuevo reservista
router.post('/', reservista_1.crearReservista);
// Ruta para actualizar un reservista existente
router.put('/:id', reservista_1.actualizarReservista);
// Ruta para eliminar un reservista
router.delete('/:id', reservista_1.eliminarReservista);
exports.default = router;
//# sourceMappingURL=reservista.js.map
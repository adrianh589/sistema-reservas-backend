"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const direccionUbicacion_1 = require("../controllers/direccionUbicacion");
const router = express_1.default.Router();
// Rutas para las direcciones de ubicaciones
router.get('/', direccionUbicacion_1.getDireccionesUbicaciones);
router.post('/', direccionUbicacion_1.createDireccionUbicacion);
router.get('/:id', direccionUbicacion_1.getDireccionUbicacion);
router.put('/:id', direccionUbicacion_1.updateDireccionUbicacion);
router.delete('/:id', direccionUbicacion_1.deleteDireccionUbicacion);
exports.default = router;
//# sourceMappingURL=direccionHabitacion.js.map
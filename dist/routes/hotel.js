"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hoteles_1 = require("../controllers/hoteles");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.default.Router();
// Ruta para obtener todos los hoteles
router.get('/', validar_jwt_1.default, hoteles_1.getHoteles);
// Ruta para obtener un hotel
router.get('/:id', validar_jwt_1.default, hoteles_1.getHotel);
// Ruta para crear un nuevo hotel
router.post('/', validar_jwt_1.default, hoteles_1.crearHotel);
// Ruta para actualizar un hotel existente
router.put('/:id', validar_jwt_1.default, hoteles_1.actualizarHotel);
// Ruta para eliminar un hotel
router.delete('/:id', validar_jwt_1.default, hoteles_1.eliminarHotel);
exports.default = router;
//# sourceMappingURL=hotel.js.map
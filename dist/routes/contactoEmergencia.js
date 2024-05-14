"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactosEmergencia_1 = require("../controllers/contactosEmergencia");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = express_1.default.Router();
// Ruta para obtener todos los contactos de emergencia
router.get('/', validar_jwt_1.default, contactosEmergencia_1.getContactosEmergencia);
// Ruta para crear un nuevo contacto de emergencia
router.post('/', validar_jwt_1.default, contactosEmergencia_1.crearContactoEmergencia);
// Ruta para actualizar un contacto de emergencia existente
router.put('/:id', validar_jwt_1.default, contactosEmergencia_1.actualizarContactoEmergencia);
// Ruta para eliminar un contacto de emergencia
router.delete('/:id', validar_jwt_1.default, contactosEmergencia_1.eliminarContactoEmergencia);
exports.default = router;
//# sourceMappingURL=contactoEmergencia.js.map
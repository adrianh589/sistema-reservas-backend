"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tiposDocumento_1 = require("../controllers/tiposDocumento");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
const router = (0, express_1.Router)();
// Definición de las rutas para la gestión de tipos de documento
router.get('/', tiposDocumento_1.getTiposDocumento); // Obtener todos los tipos de doucmento
router.get('/:id', validar_jwt_1.default, tiposDocumento_1.getTipoDocumento); //  Obtener un tipo de doucmento por su ID
router.post('/', validar_jwt_1.default, tiposDocumento_1.crearTipoDocumento); // Crear un tipo de documento
router.put('/:id', validar_jwt_1.default, tiposDocumento_1.actualizarTipoDocumento); // Actualizar un administrador existente por su ID
router.delete('/:id', validar_jwt_1.default, tiposDocumento_1.eliminarTipoDocumento); // Eliminar un tipo de documento por su ID
exports.default = router;
//# sourceMappingURL=tipoDocumento.js.map
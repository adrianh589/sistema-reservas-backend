"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminstradores_1 = require("../controllers/adminstradores");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
// Creación de un enrutador de Express
const router = (0, express_1.Router)();
// Definición de las rutas para la gestión de administradores
router.get('/', validar_jwt_1.default, adminstradores_1.getAdministradores); // Obtener todos los administradores
router.get('/:id', validar_jwt_1.default, adminstradores_1.getAdministrador); // Obtener un administrador por su ID
router.post('/', adminstradores_1.postAdministrador); // Crear un nuevo administrador
router.put('/:id', validar_jwt_1.default, adminstradores_1.putAdministrador); // Actualizar un administrador existente por su ID
router.delete('/:id', validar_jwt_1.default, adminstradores_1.deleteAdministrador); // Eliminar un administrador por su ID
exports.default = router;
//# sourceMappingURL=administrador.js.map
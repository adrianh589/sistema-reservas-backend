"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
// Creación de un enrutador de Express
const router = (0, express_1.Router)();
// Definición de las rutas para la gestión de authenticacion
router.post('/', auth_1.login); // Obtener todos los administradores
router.get('/renew', validar_jwt_1.default, auth_1.renewToken); // Validar el token
exports.default = router;
//# sourceMappingURL=auth.js.map
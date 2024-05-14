"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
// Creación de un enrutador de Express
const router = (0, express_1.Router)();
// Definición de las rutas para la gestión de authenticacion
router.get('/', auth_1.login); // Obtener todos los administradores
exports.default = router;
//# sourceMappingURL=auth.js.map
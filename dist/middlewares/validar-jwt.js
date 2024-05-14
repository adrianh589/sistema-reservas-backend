"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware para validar un token JWT en las solicitudes.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @param next La función NextFunction de Express para pasar al siguiente middleware.
 * @returns Un middleware que verifica si se proporcionó un token válido en la solicitud.
 */
const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    // Verificar si se proporcionó un token en la cabecera de la solicitud
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No se proporcionó ningún token en la petición'
        });
    }
    try {
        // Decodificar el token y obtener los datos de usuario
        const { username, correo } = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_SEED);
        // Agregar los datos de usuario decodificados al objeto Request
        req.username = username;
        req.correo = correo;
    }
    catch (error) {
        // Manejar errores de token inválido
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        });
    }
    // Pasar al siguiente middleware
    next();
};
exports.validarJWT = validarJWT;
exports.default = exports.validarJWT;
//# sourceMappingURL=validar-jwt.js.map
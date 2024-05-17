"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renewToken = exports.login = void 0;
const jwt_1 = __importDefault(require("../helpers/jwt"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const administrador_1 = __importDefault(require("../models/administrador"));
/**
 * Controlador para iniciar sesión de un usuario.
 * @param req El objeto de solicitud HTTP.
 * @param res El objeto de respuesta HTTP.
 * @returns Un objeto de respuesta HTTP.
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        // Verifica si el usuario existe en la base de datos
        const administrador = yield administrador_1.default.findOne({ where: { username } });
        if (!administrador) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales inválidas'
            });
        }
        // Verifica la contraseña
        const passwordMatch = yield bcrypt_1.default.compare(password, administrador.password);
        if (!passwordMatch) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales inválidas'
            });
        }
        // Genera un token JWT
        const token = yield (0, jwt_1.default)(username, administrador.correo);
        // Envía la respuesta con el token
        res.json({
            ok: true,
            msg: 'Inicio de sesión exitoso',
            token
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }
});
exports.login = login;
const renewToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.username);
        console.log(req.correo);
        if (req.username && req.correo) {
            const token = yield (0, jwt_1.default)(req.username, req.correo);
            return res.json({
                ok: true,
                msg: 'Token renovado',
                token
            });
        }
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor con los parametros del token'
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }
});
exports.renewToken = renewToken;
//# sourceMappingURL=auth.js.map
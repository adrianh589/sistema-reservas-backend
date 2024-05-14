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
exports.deleteAdministrador = exports.putAdministrador = exports.postAdministrador = exports.getAdministrador = exports.getAdministradores = void 0;
const administrador_1 = __importDefault(require("../models/administrador"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../helpers/jwt");
/**
 * Controlador para obtener todos los administradores.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la lista de administradores.
 */
const getAdministradores = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const administradores = yield administrador_1.default.findAll();
        return res.json({
            msg: 'Administradores encontrados',
            administradores
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
});
exports.getAdministradores = getAdministradores;
/**
 * Controlador para obtener un administrador por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el administrador encontrado.
 */
const getAdministrador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const administrador = yield administrador_1.default.findByPk(id);
        if (!administrador) {
            return res.status(404).json({
                ok: false,
                msg: `No existe un administrador por el id: ${id}`
            });
        }
        return res.json({
            ok: true,
            msg: 'Administrador encontrado',
            administrador
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
});
exports.getAdministrador = getAdministrador;
/**
 * Controlador para crear un nuevo administrador.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el administrador creado.
 */
const postAdministrador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { username, correo, password } = body;
    try {
        // Verificar si ya existe un administrador con el correo proporcionado
        const existeCorreo = yield administrador_1.default.findOne({ where: { correo: correo } });
        if (existeCorreo) {
            return res.json({
                ok: false,
                msg: 'Ya existe un administrador con ese email'
            });
        }
        // Verificar si ya existe un administrador con el nombre de usuario proporcionado
        const existeUsuario = yield administrador_1.default.findOne({ where: { username: username } });
        if (existeUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un administrador con ese nombre de usuario'
            });
        }
        // Encriptar contraseña
        const salt = bcrypt_1.default.genSaltSync();
        const hashedPassword = bcrypt_1.default.hashSync(password, salt); // Encripta la contraseña de la solicitud
        // Guardar usuario
        const administrador = yield administrador_1.default.create(Object.assign(Object.assign({}, body), { password: hashedPassword }));
        // Generar JWT
        const token = yield (0, jwt_1.generateJWT)(username, correo);
        res.json({
            ok: true,
            msg: 'Administrador creado correctamente',
            administrador,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
});
exports.postAdministrador = postAdministrador;
/**
 * Controlador para actualizar un administrador existente por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el administrador actualizado.
 */
const putAdministrador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const administrador = yield administrador_1.default.findByPk(id);
        if (!administrador) {
            return res.status(404).json({
                ok: false,
                msg: `No existe un administrador con el id: ${id}`
            });
        }
        yield administrador.update(body);
        return res.status(200).json({
            ok: true,
            msg: `Administrador actualizado correctamente`,
            administrador
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
});
exports.putAdministrador = putAdministrador;
/**
 * Controlador para eliminar un administrador por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el administrador eliminado.
 */
const deleteAdministrador = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const administrador = yield administrador_1.default.findByPk(id);
        if (!administrador) {
            return res.status(404).json({
                ok: false,
                msg: `No existe un administrador con el id: ${id}`
            });
        }
        yield administrador.destroy();
        return res.status(200).json({
            ok: true,
            msg: `Administrador eliminado correctamente`,
            administrador
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
});
exports.deleteAdministrador = deleteAdministrador;
//# sourceMappingURL=adminstradores.js.map
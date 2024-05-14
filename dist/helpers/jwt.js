"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
/**
 * Genera un nuevo token JWT.
 * @param username El nombre de usuario asociado al token.
 * @param correo El correo asociado al token.
 * @returns Una promesa que se resuelve con el token JWT generado.
 */
const generateJWT = (username, correo) => {
    return new Promise((resolve, reject) => {
        // Construir el payload del token
        const payload = { username, correo };
        // Firmar el token utilizando el seed proporcionado
        (0, jsonwebtoken_1.sign)(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h' // El token expira en 2 horas
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve(token);
        });
    });
};
exports.generateJWT = generateJWT;
exports.default = exports.generateJWT;
//# sourceMappingURL=jwt.js.map
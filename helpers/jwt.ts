import { sign, Secret } from 'jsonwebtoken';

// Definición de la estructura del payload del token
interface Payload {
    username: string;
    correo: string;
}

/**
 * Genera un nuevo token JWT.
 * @param username El nombre de usuario asociado al token.
 * @param correo El correo asociado al token.
 * @returns Una promesa que se resuelve con el token JWT generado.
 */
export const generateJWT = (username: string, correo: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Construir el payload del token
        const payload: Payload = { username, correo };

        // Firmar el token utilizando el seed proporcionado
        sign(payload, process.env.SECRET_JWT_SEED as Secret, {
            expiresIn: '2h' // El token expira en 2 horas
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            resolve(token as string);
        });
    });
}

export default generateJWT;

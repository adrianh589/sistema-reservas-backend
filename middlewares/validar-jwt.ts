import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Interfaz que define la estructura del token decodificado
interface DecodedToken {
    username: string;
    correo: string;
}

// Interfaz que extiende la interfaz Request para incluir los datos de usuario decodificados del token
interface RequestWithUserData extends Request {
    username?: string;
    correo?: string;
}

/**
 * Middleware para validar un token JWT en las solicitudes.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @param next La función NextFunction de Express para pasar al siguiente middleware.
 * @returns Un middleware que verifica si se proporcionó un token válido en la solicitud.
 */
export const validarJWT = (req: RequestWithUserData, res: Response, next: NextFunction) => {
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
        const { username, correo } = jwt.verify(token, process.env.SECRET_JWT_SEED!) as DecodedToken;

        // Agregar los datos de usuario decodificados al objeto Request
        req.username = username;
        req.correo = correo;

    } catch (error) {
        // Manejar errores de token inválido
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido'
        });
    }

    // Pasar al siguiente middleware
    next();
};

export default validarJWT;

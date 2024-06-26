import { Request, Response } from 'express';
import generateJWT from "../helpers/jwt";
import bcrypt from 'bcrypt';
import Administrador, {AdministradorClass} from "../models/administrador";
import {RequestWithUserData} from "../middlewares/validar-jwt";

/**
 * Controlador para iniciar sesión de un usuario.
 * @param req El objeto de solicitud HTTP.
 * @param res El objeto de respuesta HTTP.
 * @returns Un objeto de respuesta HTTP.
 */
export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        // Verifica si el usuario existe en la base de datos
        const administrador = await Administrador.findOne({ where: { username } }) as AdministradorClass;

        if (!administrador) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales inválidas'
            });
        }

        // Verifica la contraseña
        const passwordMatch = await bcrypt.compare(password, administrador.password);

        if (!passwordMatch) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales inválidas'
            });
        }

        // Genera un token JWT
        const token = await generateJWT(username, administrador.correo);

        // Envía la respuesta con el token
        res.json({
            ok: true,
            msg: 'Inicio de sesión exitoso',
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }
};

export const renewToken = async ( req: RequestWithUserData, res: Response ) => {

    try{
        console.log(req.username);
        console.log(req.correo);
        if (req.username && req.correo) {
            const token = await generateJWT( req.username, req.correo );

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
    } catch (error){
        console.error(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }


}

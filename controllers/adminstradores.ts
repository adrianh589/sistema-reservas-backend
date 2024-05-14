import { Request, Response } from "express";
import Administrador from "../models/administrador";
import bcrypt from 'bcrypt';
import { generateJWT } from '../helpers/jwt';

/**
 * Controlador para obtener todos los administradores.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con la lista de administradores.
 */
export const getAdministradores = async (req: Request, res: Response) => {

    try{
        const administradores = await Administrador.findAll();

        return res.json({
            msg: 'Administradores encontrados',
            administradores
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
}

/**
 * Controlador para obtener un administrador por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el administrador encontrado.
 */
export const getAdministrador = async (req: Request, res: Response) => {
    try {
        const { id} = req.params;

        const administrador = await Administrador.findByPk(id);

        if (!administrador){
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
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
}

/**
 * Controlador para crear un nuevo administrador.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el administrador creado.
 */
export const postAdministrador = async (req: Request, res: Response) => {

    const { body } = req;
    const { username, correo, password } = body;

    try {

        // Verificar si ya existe un administrador con el correo proporcionado
        const existeCorreo = await Administrador.findOne({ where: { correo: correo } });
        if (existeCorreo) {
            return res.json({
                ok: false,
                msg: 'Ya existe un administrador con ese email'
            });
        }

        // Verificar si ya existe un administrador con el nombre de usuario proporcionado
        const existeUsuario = await Administrador.findOne({ where: { username: username } });

        if (existeUsuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un administrador con ese nombre de usuario'
            });
        }

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt); // Encripta la contraseña de la solicitud

        // Guardar usuario
        const administrador = await Administrador.create({...body, password: hashedPassword});

        // Generar JWT
        const token = await generateJWT(username, correo);

        res.json({
            ok: true,
            msg: 'Administrador creado correctamente',
            administrador,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
}

/**
 * Controlador para actualizar un administrador existente por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el administrador actualizado.
 */
export const putAdministrador = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        const administrador = await Administrador.findByPk(id);

        if (!administrador) {
            return res.status(404).json({
                ok: false,
                msg: `No existe un administrador con el id: ${id}`
            });
        }

        await administrador.update(body);

        return res.status(200).json({
            ok: true,
            msg: `Administrador actualizado correctamente`,
            administrador
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
}

/**
 * Controlador para eliminar un administrador por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el administrador eliminado.
 */
export const deleteAdministrador = async (req: Request, res: Response) => {

    const {id} = req.params;

    try {
        const administrador = await Administrador.findByPk(id);

        if (!administrador) {
            return res.status(404).json({
                ok: false,
                msg: `No existe un administrador con el id: ${id}`
            });
        }

        await administrador.destroy();

        return res.status(200).json({
            ok: true,
            msg: `Administrador eliminado correctamente`,
            administrador
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, hable con el administrador',
        });
    }
}



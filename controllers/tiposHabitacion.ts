import { Request, Response } from 'express';
import TipoHabitacion from '../models/tipoHabitacion';

/**
 * Obtiene todos los tipos de habitaciones.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con los tipos de habitaciones encontrados.
 */
export const getTiposHabitaciones = async (req: Request, res: Response) => {
    try {
        const tiposHabitaciones = await TipoHabitacion.findAll();
        res.json({
            ok: true,
            msg: 'Tipos de habitaciones encontrados',
            tiposHabitaciones
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los tipos de habitaciones'
        });
    }
};

/**
 * Obtiene un tipo de habitación por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el tipo de habitación encontrado.
 */
export const getTipoHabitacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const tipoHabitacion = await TipoHabitacion.findByPk(id);
        if (!tipoHabitacion) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró un tipo de habitación con el id ${id}`
            });
        }
        res.json({
            ok: true,
            msg: 'Tipo de habitación encontrado',
            tipoHabitacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener el tipo de habitación'
        });
    }
};

/**
 * Crea un nuevo tipo de habitación.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el tipo de habitación creado.
 */
export const crearTipoHabitacion = async (req: Request, res: Response) => {
    const { nombre } = req.body;
    try {
        const tipoHabitacion = await TipoHabitacion.create({ nombre });
        res.json({
            ok: true,
            msg: 'Tipo de habitación creado correctamente',
            tipoHabitacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear el tipo de habitación'
        });
    }
};

/**
 * Actualiza un tipo de habitación existente por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON con el tipo de habitación actualizado.
 */
export const actualizarTipoHabitacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const tipoHabitacion = await TipoHabitacion.findByPk(id);
        if (!tipoHabitacion) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró un tipo de habitación con el id ${id}`
            });
        }
        await tipoHabitacion.update({ nombre });
        res.json({
            ok: true,
            msg: 'Tipo de habitación actualizado correctamente',
            tipoHabitacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar el tipo de habitación'
        });
    }
};

/**
 * Elimina un tipo de habitación por su ID.
 * @param req El objeto Request de Express.
 * @param res El objeto Response de Express.
 * @returns Una respuesta JSON indicando si se eliminó el tipo de habitación correctamente.
 */
export const eliminarTipoHabitacion = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const tipoHabitacion = await TipoHabitacion.findByPk(id);
        if (!tipoHabitacion) {
            return res.status(404).json({
                ok: false,
                msg: `No se encontró un tipo de habitación con el id ${id}`
            });
        }
        await tipoHabitacion.destroy();
        res.json({
            ok: true,
            msg: 'Tipo de habitación eliminado correctamente',
            tipoHabitacion
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al eliminar el tipo de habitación'
        });
    }
};

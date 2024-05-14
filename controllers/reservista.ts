import { Request, Response } from 'express';
import Reservista from '../models/reservista';

// Obtener todos los reservistas
export const getReservistas = async (req: Request, res: Response) => {
    try {
        const reservistas = await Reservista.findAll();
        res.json({
            ok: true,
            msg: 'Reservistas encontrados',
            reservistas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los reservistas'
        });
    }
};

// Obtener todos los reservistas
export const getReservista = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        const reservista = await Reservista.findByPk(id);
        res.json({
            ok: true,
            msg: 'Reservista encontrado',
            reservista
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los reservistas'
        });
    }
};

// Crear un nuevo reservista
export const crearReservista = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const reservista = await Reservista.create(body);
        res.json({
            ok: true,
            msg: 'Reservista creado exitosamente',
            reservista: reservista
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear el reservista'
        });
    }
};

// Actualizar un reservista existente
export const actualizarReservista = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const reservista = await Reservista.findByPk(id);
        if (!reservista) {
            return res.status(404).json({
                ok: false,
                message: 'Reservista no encontrado'
            });
        }
        await reservista.update(body);
        res.json({
            ok: true,
            msg: 'Reservista actualizado correctamente',
            reservista
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar el reservista'
        });
    }
};

// Eliminar un reservista
export const eliminarReservista = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const reservista = await Reservista.findByPk(id);
        if (!reservista) {
            return res.status(404).json({
                ok: false,
                message: 'Reservista no encontrado'
            });
        }
        await reservista.destroy();
        res.json({
            ok: true,
            message: 'Reservista eliminado correctamente',
            reservista
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al eliminar el reservista'
        });
    }
};

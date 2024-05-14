import { Request, Response } from 'express';
import Huesped from '../models/huesped';
import Reserva from "../models/reserva";
import Reservista from "../models/reservista";

/**
 * Obtener todos los huéspedes.
 */
export const getHuespedes = async (req: Request, res: Response) => {
    try {
        const huespedes = await Huesped.findAll({
            include: [Reserva, Reservista]
        });
        res.json({
            ok: true,
            msg: 'Huespedes encontrados',
            huespedes
        });
    } catch (error) {
        console.error('Error al obtener los huéspedes:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener los huéspedes'
        });
    }
};

/**
 * Crear un nuevo huésped.
 */
export const crearHuesped = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const huesped = await Huesped.create(body);
        res.json({
            ok: true,
            msg: 'Huesped creado correctamente',
            huesped
        });
    } catch (error) {
        console.error('Error al crear el huésped:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el huésped'
        });
    }
};

/**
 * Obtener un huésped por su ID.
 */
export const getHuespedById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const huesped = await Huesped.findByPk(id);
        if (huesped) {
            res.json({
                ok: true,
                msg: 'Huesped encontrad',
                huesped
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: 'Huesped no encontrado'
            });
        }
    } catch (error) {
        console.error('Error al obtener el huésped por ID:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener el huésped por ID'
        });
    }
};

/**
 * Actualizar un huésped por su ID.
 */
export const actualizarHuesped = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const huesped = await Huesped.findByPk(id);
        if (huesped) {
            await huesped.update(body);
            res.json({
                ok: true,
                msg: 'Huesped actualizado correctamente',
                huesped
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: 'Huesped no encontrado'
            });
        }
    } catch (error) {
        console.error('Error al actualizar el huésped:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar el huésped'
        });
    }
};

/**
 * Eliminar un huésped por su ID.
 */
export const eliminarHuesped = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const huesped = await Huesped.findByPk(id);
        if (huesped) {
            await huesped.destroy();
            res.json({
                ok: true,
                msg: 'Huesped eliminado correctamente',
                huesped
            });
        } else {
            res.status(404).json({
                ok: false,
                msg: 'Huesped no encontrado'
            });
        }
    } catch (error) {
        console.error('Error al eliminar el huésped:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el huésped'
        });
    }
};

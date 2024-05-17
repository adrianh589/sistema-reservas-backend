import { Request, Response } from 'express';
import Hotel from '../models/hotel';

// Obtener todos los hoteles
export const getHoteles = async (req: Request, res: Response) => {
    try {
        const hoteles = await Hotel.findAll();
        res.json({
            ok: true,
            msg: 'Hoteles encontrados',
            hoteles
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los hoteles'
        });
    }
};

// Obtener un hotel
export const getHotel = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const hotel = await Hotel.findByPk(id);
        res.json({
            ok: true,
            msg: 'Hotel encontrado',
            hotel
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al obtener los hoteles'
        });
    }
};

// Crear un nuevo hotel
export const crearHotel = async (req: Request, res: Response) => {
    const { body } = req;
    try {

        // Verificar si ya existe un hotel con el mismo nombre
        const hotelExistente = await Hotel.findOne({ where: body });
        if (hotelExistente) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un hotel con el mismo nombre'
            });
        }

        const hotel = await Hotel.create(body);
        res.json({
            ok: true,
            msg: 'Hotel creado correctamente',
            hotel
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al crear el hotel'
        });
    }
};

// Actualizar un hotel existente
export const actualizarHotel = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const hotel = await Hotel.findByPk(id);
        if (!hotel) {
            return res.status(404).json({
                ok: false,
                msg: 'Hotel no encontrado'
            });
        }
        await hotel.update(body);
        res.json({
            ok: true,
            msg: 'Hotel actualizado correctamente',
            hotel
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al actualizar el hotel'
        });
    }
};

// Eliminar un hotel
export const eliminarHotel = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const hotel = await Hotel.findByPk(id);
        if (!hotel) {
            return res.status(404).json({
                ok: false,
                msg: 'Hotel no encontrado'
            });
        }
        await hotel.destroy();
        res.json({
            ok: true,
            msg: 'Hotel eliminado correctamente'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error al eliminar el hotel'
        });
    }
};

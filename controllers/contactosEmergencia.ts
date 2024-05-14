import { Request, Response } from 'express';
import ContactoEmergencia from '../models/contactoEmergencia';

// Obtener todos los contactos de emergencia
export const getContactosEmergencia = async (req: Request, res: Response) => {
    try {
        const contactos = await ContactoEmergencia.findAll();
        res.json({
            ok: true,
            msg: 'Contactos Emergencia encontrados',
            contactos
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Hubo un error al obtener los contactos de emergencia'
        });
    }
};

// Crear un nuevo contacto de emergencia
export const crearContactoEmergencia = async (req: Request, res: Response) => {
    const { body } = req;
    try {
        const contacto = await ContactoEmergencia.create(body);
        res.json({
            ok: true,
            msg: 'Contacto Emergencia creado',
            contacto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Hubo un error al crear el contacto de emergencia'
        });
    }
};

// Actualizar un contacto de emergencia existente
export const actualizarContactoEmergencia = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const contacto = await ContactoEmergencia.findByPk(id);
        if (!contacto) {
            return res.status(404).json({
                ok: false,
                message: 'Contacto de emergencia no encontrado'
            });
        }
        await contacto.update(body);
        res.json({
            ok: true,
            msg: 'Contacto emergencia actualizado correctamente',
            contacto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Hubo un error al actualizar el contacto de emergencia'
        });
    }
};

// Eliminar un contacto de emergencia
export const eliminarContactoEmergencia = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const contacto = await ContactoEmergencia.findByPk(id);
        if (!contacto) {
            return res.status(404).json({
                ok: false,
                message: 'Contacto de emergencia no encontrado'
            });
        }
        await contacto.destroy();
        res.json({
            ok: true,
            message: 'Contacto de emergencia eliminado correctamente',
            contacto
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: 'Hubo un error al eliminar el contacto de emergencia'
        });
    }
};

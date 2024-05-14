import { Router } from 'express';
import {
    getReservas,
    getReserva,
    crearReserva,
    actualizarReserva,
    eliminarReserva
} from '../controllers/reserva';

const router = Router();

/**
 * Rutas para gestionar las reservas.
 */

// Obtiene todas las reservas.
router.get('/', getReservas);

// Obtiene una reserva por su ID.
router.get('/:id', getReserva);

// Crea una nueva reserva.
router.post('/', crearReserva);

// Actualiza una reserva por su ID.
router.put('/:id', actualizarReserva);

// Elimina una reserva por su ID.
router.delete('/:id', eliminarReserva);

export default router;

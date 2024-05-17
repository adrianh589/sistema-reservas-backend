import { Router } from 'express';
import {
    getReservas,
    getReserva,
    crearReserva,
    actualizarReserva,
    eliminarReserva
} from '../controllers/reserva';
import validarJWT from "../middlewares/validar-jwt";

const router = Router();

/**
 * Rutas para gestionar las reservas.
 */

// Obtiene todas las reservas.
router.get('/', validarJWT, getReservas);

// Obtiene una reserva por su ID.
router.get('/:id', validarJWT, getReserva);

// Crea una nueva reserva.
router.post('/', crearReserva);

// Actualiza una reserva por su ID.
router.put('/:id', validarJWT, actualizarReserva);

// Elimina una reserva por su ID.
router.delete('/:id', validarJWT, eliminarReserva);

export default router;

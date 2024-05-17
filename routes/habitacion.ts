import { Router } from 'express';
import {
    getHabitaciones,
    getHabitacion,
    crearHabitacion,
    actualizarHabitacion,
    eliminarHabitacion, getHabitacionesDisponibles
} from '../controllers/habitacion';
import validarJWT from "../middlewares/validar-jwt";

const router = Router();

/**
 * Rutas para gestionar las habitaciones, solo administradores
 */

// Ruta para obtener todas las habitaciones
router.get('/', validarJWT, getHabitaciones);

// Ruta para obtener una habitación por su ID
router.get('/:id', getHabitacion);

// Ruta para crear una nueva habitación
router.post('/', validarJWT, crearHabitacion);

// Ruta para actualizar una habitación por su ID
router.put('/:id', validarJWT, actualizarHabitacion);

// Ruta para eliminar una habitación por su ID
router.delete('/:id', validarJWT, eliminarHabitacion);

/**
 * Rutas para los usuarios
 */
router.post('/reservas/disponibles', getHabitacionesDisponibles);


export default router;

import { Router } from 'express';
import {
    getHabitaciones,
    getHabitacion,
    crearHabitacion,
    actualizarHabitacion,
    eliminarHabitacion
} from '../controllers/habitacion';

const router = Router();

/**
 * Rutas para gestionar las habitaciones.
 */

// Ruta para obtener todas las habitaciones
router.get('/', getHabitaciones);

// Ruta para obtener una habitación por su ID
router.get('/:id', getHabitacion);

// Ruta para crear una nueva habitación
router.post('/', crearHabitacion);

// Ruta para actualizar una habitación por su ID
router.put('/:id', actualizarHabitacion);

// Ruta para eliminar una habitación por su ID
router.delete('/:id', eliminarHabitacion);

export default router;

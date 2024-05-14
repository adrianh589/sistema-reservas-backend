import { Router } from 'express';
import {
    actualizarUbicacionHabitacion,
    crearUbicacionHabitacion, eliminarUbicacionHabitacion,
    getUbicacionesHabitaciones,
    getUbicacionHabitacion,
} from '../controllers/ubicacionHabitacion';

const router = Router();

// Rutas para las ubicaciones de habitaciones
router.get('/', getUbicacionesHabitaciones);
router.get('/:id', getUbicacionHabitacion);
router.post('/', crearUbicacionHabitacion);
router.put('/:id', actualizarUbicacionHabitacion);
router.delete('/:id', eliminarUbicacionHabitacion);


export default router;

import { Router } from 'express';
import {
    getTiposHabitaciones,
    getTipoHabitacion,
    crearTipoHabitacion,
    actualizarTipoHabitacion,
    eliminarTipoHabitacion
} from '../controllers/tiposHabitacion';

const router = Router();

// Rutas para los tipos de habitaciones
router.get('/', getTiposHabitaciones);
router.get('/:id', getTipoHabitacion);
router.post('/', crearTipoHabitacion);
router.put('/:id', actualizarTipoHabitacion);
router.delete('/:id', eliminarTipoHabitacion);

export default router;

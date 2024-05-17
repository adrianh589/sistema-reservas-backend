import { Router } from 'express';
import {
    getTiposHabitaciones,
    getTipoHabitacion,
    crearTipoHabitacion,
    actualizarTipoHabitacion,
    eliminarTipoHabitacion
} from '../controllers/tiposHabitacion';
import validarJWT from "../middlewares/validar-jwt";

const router = Router();

// Rutas para los tipos de habitaciones
router.get('/', validarJWT, getTiposHabitaciones);
router.get('/:id', validarJWT, getTipoHabitacion);
router.post('/', validarJWT, crearTipoHabitacion);
router.put('/:id', validarJWT, actualizarTipoHabitacion);
router.delete('/:id', validarJWT, eliminarTipoHabitacion);

export default router;

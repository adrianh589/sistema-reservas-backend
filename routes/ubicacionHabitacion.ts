import { Router } from 'express';
import {
    actualizarUbicacionHabitacion,
    crearUbicacionHabitacion,
    eliminarUbicacionHabitacion,
    getUbicacionesHabitaciones,
    getUbicacionHabitacion,
} from '../controllers/ubicacionHabitacion';
import validarJWT from "../middlewares/validar-jwt";

const router = Router();

// Rutas para las ciudades
router.get('/', getUbicacionesHabitaciones);
router.get('/:id', getUbicacionHabitacion);
router.post('/', validarJWT, crearUbicacionHabitacion);
router.put('/:id', validarJWT, actualizarUbicacionHabitacion);
router.delete('/:id', validarJWT, eliminarUbicacionHabitacion);


export default router;

import express from 'express';
import {getHoteles, crearHotel, actualizarHotel, eliminarHotel, getHotel} from '../controllers/hoteles';
import validarJWT from "../middlewares/validar-jwt";

const router = express.Router();

// Ruta para obtener todos los hoteles
router.get('/', validarJWT, getHoteles);

// Ruta para obtener un hotel
router.get('/:id', validarJWT, getHotel);

// Ruta para crear un nuevo hotel
router.post('/', validarJWT, crearHotel);

// Ruta para actualizar un hotel existente
router.put('/:id', validarJWT, actualizarHotel);

// Ruta para eliminar un hotel
router.delete('/:id', validarJWT, eliminarHotel);

export default router;

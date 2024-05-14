import express from 'express';
import {
    getReservistas,
    crearReservista,
    actualizarReservista,
    eliminarReservista,
    getReservista
} from '../controllers/reservista';

const router = express.Router();

// Ruta para obtener todos los reservistas
router.get('/', getReservistas);

// Ruta para obtener un reservista
router.get('/', getReservista);

// Ruta para crear un nuevo reservista
router.post('/', crearReservista);

// Ruta para actualizar un reservista existente
router.put('/:id', actualizarReservista);

// Ruta para eliminar un reservista
router.delete('/:id', eliminarReservista);

export default router;

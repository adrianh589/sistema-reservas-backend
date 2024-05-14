import { Router } from 'express';
import {
    getHuespedes,
    crearHuesped,
    getHuespedById,
    actualizarHuesped,
    eliminarHuesped
} from '../controllers/huespedes';

const router = Router();

// Rutas para los huéspedes
router.get('/', getHuespedes);
router.post('/', crearHuesped);
router.get('/:id', getHuespedById);
router.put('/:id', actualizarHuesped);
router.delete('/:id', eliminarHuesped);

export default router;

import express from 'express';
import {
    getDireccionesUbicaciones,
    createDireccionUbicacion,
    getDireccionUbicacion,
    updateDireccionUbicacion,
    deleteDireccionUbicacion,
} from '../controllers/direccionUbicacion';

const router = express.Router();

// Rutas para las direcciones de ubicaciones
router.get('/', getDireccionesUbicaciones);
router.post('/', createDireccionUbicacion);
router.get('/:id', getDireccionUbicacion);
router.put('/:id', updateDireccionUbicacion);
router.delete('/:id', deleteDireccionUbicacion);

export default router;

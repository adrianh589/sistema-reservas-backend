import { Router } from 'express';
import {
    getTiposDocumento,
    crearTipoDocumento,
    actualizarTipoDocumento,
    eliminarTipoDocumento,
    getTipoDocumento
} from '../controllers/tiposDocumento';
import validarJWT from "../middlewares/validar-jwt";

const router = Router();

// Definición de las rutas para la gestión de tipos de documento
router.get('/', validarJWT, getTiposDocumento);// Obtener todos los tipos de doucmento
router.get('/:id', validarJWT, getTipoDocumento);//  Obtener un tipo de doucmento por su ID
router.post('/', validarJWT, crearTipoDocumento);    // Crear un tipo de documento
router.put('/:id', validarJWT, actualizarTipoDocumento);// Actualizar un administrador existente por su ID
router.delete('/:id', validarJWT, eliminarTipoDocumento);    // Eliminar un tipo de documento por su ID

export default router;

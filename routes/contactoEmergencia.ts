import express from 'express';
import { getContactosEmergencia, crearContactoEmergencia, actualizarContactoEmergencia, eliminarContactoEmergencia } from '../controllers/contactosEmergencia';
import validarJWT from "../middlewares/validar-jwt";

const router = express.Router();

// Ruta para obtener todos los contactos de emergencia
router.get('/', validarJWT, getContactosEmergencia);

// Ruta para crear un nuevo contacto de emergencia
router.post('/', validarJWT, crearContactoEmergencia);

// Ruta para actualizar un contacto de emergencia existente
router.put('/:id', validarJWT, actualizarContactoEmergencia);

// Ruta para eliminar un contacto de emergencia
router.delete('/:id', validarJWT, eliminarContactoEmergencia);

export default router;

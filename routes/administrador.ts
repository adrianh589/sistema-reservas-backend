import { Router } from 'express';
import {
    deleteAdministrador,
    getAdministrador,
    getAdministradores,
    postAdministrador,
    putAdministrador
} from "../controllers/adminstradores";
import validarJwt from "../middlewares/validar-jwt";

// Creación de un enrutador de Express
const router = Router();

// Definición de las rutas para la gestión de administradores
router.get('/', validarJwt, getAdministradores);     // Obtener todos los administradores
router.get('/:id', validarJwt, getAdministrador);    // Obtener un administrador por su ID
router.post('/', postAdministrador);     // Crear un nuevo administrador
router.put('/:id', validarJwt, putAdministrador);    // Actualizar un administrador existente por su ID
router.delete('/:id', validarJwt, deleteAdministrador); // Eliminar un administrador por su ID
export default router;

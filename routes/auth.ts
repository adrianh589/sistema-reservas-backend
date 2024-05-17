import { Router } from 'express';
import {login, renewToken} from "../controllers/auth";
import validarJWT from "../middlewares/validar-jwt";

// Creación de un enrutador de Express
const router = Router();

// Definición de las rutas para la gestión de authenticacion
router.post('/', login);     // Obtener todos los administradores
router.get('/renew', validarJWT, renewToken);     // Validar el token
export default router;

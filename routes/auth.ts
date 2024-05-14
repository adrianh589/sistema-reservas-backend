import { Router } from 'express';
import {login} from "../controllers/auth";

// Creación de un enrutador de Express
const router = Router();

// Definición de las rutas para la gestión de authenticacion
router.get('/', login);     // Obtener todos los administradores
export default router;

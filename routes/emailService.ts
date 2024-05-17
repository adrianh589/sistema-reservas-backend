import express from "express";
import {enviarEmailTest} from "../controllers/sendEmailTest";

const router = express.Router();

// Rutas para enviar email
router.get('/', enviarEmailTest);

export default router;

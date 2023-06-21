import { Router } from "express";
import { getUsuarioById, newUsuario } from "../controllers/usuarios.controller";

const router = Router();
//Consultar si existe el usuario
router.post('/usuarios', getUsuarioById)
//Registra un nuevo usuario
router.post('/usuarios/registro', newUsuario)

export default router
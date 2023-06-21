import { Router } from "express";
import { newCarrera, newSemestre } from "../controllers/decano.controller";

const router = Router();
//ruta para crear una nueva carrera
router.post('/decano/newCarrera',newCarrera)

//ruta para crear Semestre
router.post('/decano/newSemestre',newSemestre)

export default router
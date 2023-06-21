import { Router } from "express"
import { getMaterias, getSemestre } from "../controllers/semestre.controller";

const router = Router();
//ruta consulta semestres
router.get('/malla/:id',getSemestre)

//ruta consulta materias por semestre
router.post('/malla/materias',getMaterias)

export default router
import { Router } from "express"
import { getMaterias, getSemestre, getSemestreById } from "../controllers/semestre.controller";

const router = Router();
//ruta consulta semestres
router.get('/malla/:id',getSemestre)

router.get('/malla/semestre/:id',getSemestreById)

//ruta consulta materias por semestre
router.post('/malla/materias',getMaterias)

export default router
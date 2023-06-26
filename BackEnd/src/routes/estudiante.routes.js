import { Router } from "express";
import { AddMateria, getCarreras, getDecanoById, getEstudianteById, getMateriasEstudiante, newDecano, newEstudiante } from "../controllers/estudiante.controller"
const router = Router();
//Ruta para crear un nuevo usuario
router.post('/estudiantes',newEstudiante)
//Ruta para crear un nuevo decano
router.post('/estudiantes/decano',newDecano)
//ruta para asignar materia
router.post('/estudiantes/materia',AddMateria)
//Ruta Consulta de carreras
router.get('/estudiantes/carreras',getCarreras)
//Ruta para buscar un estudiante por Id
router.get('/estudiantes/:id',getEstudianteById)
//Ruta para buscar decano por ID
router.get('/estudiantes/decano/:id',getDecanoById)
//Ruta consulta materias de estudiante
router.get("/estudiantes/materia/:idEstudiante",getMateriasEstudiante)



export default router
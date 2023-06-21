import { Router } from "express";
import { getCarreras, getDecanoById, getEstudianteById, newDecano, newEstudiante } from "../controllers/estudiante.controller"
const router = Router();
//Ruta para crear un nuevo usuario
router.post('/estudiantes',newEstudiante)
//Ruta para crear un nuevo decano
router.post('/estudiantes/decano',newDecano)
//Ruta Consulta de carreras
router.get('/estudiantes/carreras',getCarreras)
//Ruta para buscar un estudiante por Id
router.get('/estudiantes/:id',getEstudianteById)
//Ruta para buscar decano por ID
router.get('/estudiantes/decano/:id',getDecanoById)



export default router
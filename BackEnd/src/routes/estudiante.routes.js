import { Router } from "express";
import {
  AddMateria,
  deleteNota,
  getCarreras,
  getDecanoById,
  getEstudianteById,
  getMateriasEstudiante,
  getNotas,
  newDecano,
  newEstudiante,
  newNota,
  updateStatus,
} from "../controllers/estudiante.controller";
const router = Router();
//Ruta para crear un nuevo usuario
router.post("/estudiantes", newEstudiante);
//Ruta para crear un nuevo decano
router.post("/estudiantes/decano", newDecano);
//ruta para asignar materia
router.post("/estudiantes/materia", AddMateria);
//ruta para crear una nueva nota
router.post("/estudiantes/nota", newNota);
//ruta consulta notas de materia
router.post("/estudiantes/notas", getNotas);
//Ruta Consulta de carreras
router.get("/estudiantes/carreras", getCarreras);
//Ruta para buscar un estudiante por Id
router.get("/estudiantes/:id", getEstudianteById);
//Ruta para buscar decano por ID
router.get("/estudiantes/decano/:id", getDecanoById);
//Ruta consulta materias de estudiante
router.get("/estudiantes/materia/:idEstudiante", getMateriasEstudiante);
// Ruta elimina una nota
router.delete("/estudiantes/nota/:idNota",deleteNota)
//Ruta para modificar el status de la materia (aprobado,reprobado)
router.put("/estudiantes/nota",updateStatus)

export default router;

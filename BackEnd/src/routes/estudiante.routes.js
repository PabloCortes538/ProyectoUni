import { Router } from "express";
import {
  AddMateria,
  Status,
  deleteNota,
  getCarreras,
  getDecanoById,
  getEstudianteById,
  getMateriaAprobada,
  getMateriasEstudiante,
  getNotas,
  materiaAprobada,
  materiasReprobadas,
  newDecano,
  newEstudiante,
  newNota,
  updateEstudiantePerfil,
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

router.post("/estudiantes/reprobados", materiasReprobadas);

router.post("/estudiantes/notaA", materiaAprobada);

router.post("/estudiantes/aprobados", getMateriaAprobada);

router.post("/estudiantes/notaR", Status);
//Ruta Consulta de carreras
router.get("/estudiantes/carreras", getCarreras);
//Ruta para buscar un estudiante por Id
router.get("/estudiantes/:id", getEstudianteById);
//Ruta para buscar decano por ID
router.get("/estudiantes/decano/:id", getDecanoById);
//Ruta consulta materias de estudiante
router.get("/estudiantes/materia/:idEstudiante", getMateriasEstudiante);
// Ruta elimina una nota
router.delete("/estudiantes/nota/:idNota", deleteNota);
//Ruta para modificar el status de la materia (aprobado,reprobado)
router.put("/estudiantes/nota", updateStatus);

router.put("/estudiantes/updateEstudiante", updateEstudiantePerfil);

export default router;

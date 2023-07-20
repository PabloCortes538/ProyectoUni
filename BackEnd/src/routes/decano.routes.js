import { Router } from "express";
import {
  deleteMateriaById,
  getAllEstudiantes,
  newCarrera,
  newMateria,
  newSemestre,
  updateMateriaById,
  updateStatusEstudiante,
} from "../controllers/decano.controller";

const router = Router();
//get all estudiantes
router.get("/decano/estudiantes",getAllEstudiantes)
//ruta para crear una nueva carrera
router.post("/decano/newCarrera", newCarrera);

//ruta para crear Semestre
router.post("/decano/newSemestre", newSemestre);

//ruta para crear un Materia
router.post("/decano/newMateria", newMateria);

//ruta para eliminar Materia
router.delete("/decano/materia/:id", deleteMateriaById);

//ruta para actulizar Materia
router.put("/decano/materia/:id", updateMateriaById);

router.put("/decano/estudianteStatus",updateStatusEstudiante);

export default router;

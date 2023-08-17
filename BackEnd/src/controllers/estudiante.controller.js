import { getConnection, queries, sql } from "../database";
//Consulta estudiante por id
export const getEstudianteById = async (req, res) => {
  const { id } = req.params;
  if (id == "" || id == null || id == undefined) {
    res.status(404);
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(queries.getEstudianteById);
    res.json(result.recordset[0]);
  } catch (error) {
    res.send(error.menssage);
  }
};
//Post Agregar un nuevo Estudiante
export const newEstudiante = async (req, res) => {
  const { nombre, apellido, CI, idMalla, idUsuario, statusEstudiante } =
    req.body;
  if (
    nombre == null ||
    apellido == null ||
    CI == null ||
    idMalla == null ||
    idUsuario == null
  ) {
    res.status(400);
  }
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("apellido", sql.VarChar, apellido)
      .input("CI", sql.Int, CI)
      .input("idMalla", sql.Int, idMalla)
      .input("idUsuario", sql.Int, idUsuario)
      .input("statusEstudiante", sql.VarChar, statusEstudiante)
      .query(queries.newEstudiante);
    const idEstudiante = result.recordset[0].idEstudiante;
    res.json({
      nombre,
      apellido,
      CI,
      idMalla,
      idUsuario,
      idEstudiante,
      statusEstudiante,
    });
  } catch (error) {
    res.send(error.menssage);
  }
};
//Consultar carreras Disponibles
export const getCarreras = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getCarreras);

    res.json(result.recordset);
  } catch (error) {
    res.status(500);
  }
};
//Consultar decano Id
export const getDecanoById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(queries.getDecanoById);
    res.json(result.recordset[0]);
  } catch (error) {
    res.send(error.menssage);
  }
};
//Post Agregar un nuevo Estudiante
export const newDecano = async (req, res) => {
  const { nombre, apellido, CI, idUsuario } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("nombre", sql.VarChar, nombre)
      .input("apellido", sql.VarChar, apellido)
      .input("CI", sql.Int, CI)
      .input("idUsuario", sql.Int, idUsuario)
      .query(queries.newDecano);

    res.json({ nombre, apellido, CI, idUsuario });
  } catch (error) {
    res.send(error.menssage);
  }
};
export const AddMateria = async (req, res) => {
  const { idMateria, idEstudiante, status } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("idMateria", sql.Int, idMateria)
      .input("idEstudiante", sql.Int, idEstudiante)
      .input("status", sql.VarChar, status)
      .query(queries.addMateria);
    res.json({ idMateria, idEstudiante, status });
  } catch (error) {
    res.send(error);
  }
};
export const getMateriasEstudiante = async (req, res) => {
  const { idEstudiante } = req.params;
  let materias = [];
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idEstudiante", sql.Int, idEstudiante)
      .query(queries.getEstudianteMaterias);

    for (let i = 0; result.recordset.length > i; i++) {
      const resultado = await pool
        .request()
        .input("idMateria", sql.Int, result.recordset[i].idMateria)
        .query(queries.getMateriasEst);
      materias.push(Object.assign(resultado.recordset[0], result.recordset[i]));
    }
    res.json(materias);
  } catch (error) {
    res.send(error);
  }
};

export const newNota = async (req, res) => {
  const { nota, idMateria, idEstudiante, nombreNota } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("nota", sql.Int, nota)
      .input("nombreNota", sql.VarChar, nombreNota)
      .query(queries.newNota);

    await pool
      .request()
      .input("idNota", sql.Int, result.recordset[0].idNota)
      .input("idMateria", sql.Int, idMateria)
      .input("idEstudiante", sql.Int, idEstudiante)
      .query(queries.addAñadirNota);
    res.json({ nombreNota, nota, idMateria, idEstudiante });
  } catch (error) {
    res.send(error);
  }
};

export const getNotas = async (req, res) => {
  const { idEstudiante, idMateria } = req.body;
  let nota = [];
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idEstudiante", sql.Int, idEstudiante)
      .input("idMateria", sql.Int, idMateria)
      .query(queries.getNotasMateriaById);
    for (let i = 0; result.recordset.length > i; i++) {
      const notas = await pool
        .request()
        .input("idNota", sql.Int, result.recordset[i].idNota)
        .query(queries.getNota);
      nota.push(notas.recordset);
    }
    res.json(nota);
  } catch (error) {}
};
export const deleteNota = async (req, res) => {
  const { idNota } = req.params;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("idNota", sql.Int, idNota)
      .query(queries.deleteNota);
    res.sendStatus(204);
  } catch (error) {
    res.send(error);
  }
};
export const updateStatus = async (req, res) => {
  const { idMateria, idEstudiante, status } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("idMateria", sql.Int, idMateria)
      .input("idEstudiante", sql.Int, idEstudiante)
      .input("status", sql.VarChar, status)
      .query(queries.updateStatus);

    res.json(status);
  } catch (error) {
    res.send(error);
  }
};
export const Status = async (req, res) => {
  const { idMateria, idEstudiante, status, promedio } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("idMateria", sql.Int, idMateria)
      .input("idEstudiante", sql.Int, idEstudiante)
      .input("promedio", sql.Float, promedio)
      .query(queries.reprobado);

    await pool
      .request()
      .input("idMateria", sql.Int, idMateria)
      .input("idEstudiante", sql.Int, idEstudiante)
      .input("status", sql.VarChar, status)
      .query(queries.updateStatus);

    res.json({ idMateria, idEstudiante, status, promedio });
  } catch (error) {
    res.send(error);
  }
};
export const materiasReprobadas = async (req, res) => {
  const { idMateria, idEstudiante } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idMateria", sql.Int, idMateria)
      .input("idEstudiante", sql.Int, idEstudiante)
      .query(queries.materiasReprobadas);

    res.json(result.recordset);
  } catch (error) {
    res.send(error);
  }
};
export const materiaAprobada = async (req, res) => {
  const { idMateria, idEstudiante, promedio } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("idMateria", sql.Int, idMateria)
      .input("idEstudiante", sql.Int, idEstudiante)
      .input("promedio", sql.Float, promedio)
      .query(queries.aprobados);

    res.json({ idMateria, idEstudiante, promedio });
  } catch (error) {
    res.send(error);
  }
};
export const getMateriaAprobada = async (req, res) => {
  const { idMateria, idEstudiante } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idMateria", sql.Int, idMateria)
      .input("idEstudiante", sql.Int, idEstudiante)
      .query(queries.getMateriasAprobadas);

    res.json(result.recordset);
  } catch (error) {
    res.send(error);
  }
};
export const updateEstudiantePerfil = async (req, res) => {
  const { nombre, apellido, CI, idMalla, idEstudiante, idUsuario } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("idEstudiante", sql.Int, idEstudiante)
      .input("nombre", sql.VarChar, nombre)
      .input("apellido", sql.VarChar, apellido)
      .input("CI", sql.Int, CI)
      .query(queries.update);

    res.json({ nombre, apellido, CI, idMalla, idEstudiante, idUsuario });
  } catch (error) {
    res.send(error);
  }
};
export const getMateriasReprobadas = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(queries.getAllMateriasReprobadasById);
    res.json(result.recordset);
  } catch (error) {
    res.send(error);
  }
};
export const getMateriasAprobadas = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(queries.getAllMateriasAprobadasById);
    res.json(result.recordset);
  } catch (error) {
    res.send(error);
  }
};
export const getMateriaById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(queries.getMateria);
    res.json(result.recordset);
  } catch (error) {
    res.send(error);
  }
};
export const deleteMateriaNota = async (req, res) => {
  const { idMateria } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idMateria", sql.Int, idMateria)
      .query(queries.deleteNotaMateria);
    res.json(result.recordset);
  } catch (error) {
    res.send(error);
  }
};
export const deleteNotaById = async (req, res) => {
  const { idNota } = req.params;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("idNota", sql.Int, idNota)
      .query(queries.deleteNotaById);
    res.json(result.request);
  } catch (error) {
    res.send(error);
  }
};
export const updateNota = async (req, res) => {
  const { idNota, nota, nombreNota } = req.body;
  try {
    const pool = await getConnection();
    await pool
      .request()
      .input("idNota", sql.Int, idNota)
      .input("nota", sql.Float, nota)
      .input("nombreNota", sql.VarChar, nombreNota)
      .query(queries.updateNota);
    res.json({idNota,nota,nombreNota});
  } catch (error) {
    res.send(error);
  }
};

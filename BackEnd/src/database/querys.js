export const queries = {
  ///CONSULTAS USUARIOS
  getAutenticacion:
    "SELECT usuario,password,idUsuario,rol FROM usuario WHERE usuario=@usuario and password= @password",
  newUsuario:
    "INSERT INTO usuario(usuario,password,email,rol) VALUES (@usuario,@password,@email,@rol)",
  ///CONSULTAS ESTUDIANTE
  getEstudianteById: "SELECT * FROM estudiante WHERE idUsuario = @id",
  newEstudiante:
    "INSERT INTO estudiante(nombre,apellido,CI,idMalla,idUsuario)OUTPUT INSERTED.idEstudiante VALUES (@nombre,@apellido,@CI,@idMalla,@idUsuario)",
  addMateria:
  " IF EXISTS(select * from estudianteMateria E WHERE E.idEstudiante=@idEstudiante AND E.idMateria=@idMateria)update estudianteMateria set status=@status WHERE (idEstudiante=@idEstudiante And idMateria=@idMateria) else insert into estudianteMateria(idEstudiante,idMateria,status) Values (@idEstudiante,@idMateria,@status)", 
  getEstudianteMaterias:
    "SELECT idMateria,status FROM estudiante E,estudianteMateria EM WHERE EM.idEstudiante=@idEstudiante and E.idEstudiante=@idEstudiante",
  getMateriasEst:
    "SELECT idMateria,nombreMateria,codigo,horasTeoricas,horasPracticas,creditos,requisito,costo FROM materia WHERE idMateria=@idMateria",
  getNotasMateriaById:
    "SELECT idNota FROM materiaNota WHERE idEstudiante=@idEstudiante AND idMateria=@idMateria",
  newNota:
    "INSERT INTO nota(nota,nombreNota) OUTPUT INSERTED.idNota,INSERTED.nota,INSERTED.nombreNota VALUES (@nota,@nombreNota)",
  addAñadirNota:
    "INSERT INTO materiaNota(idNota,idMateria,idEstudiante) VALUES (@idNota,@idMateria,@idEstudiante)",
  getNota: "SELECT * FROM nota WHERE idNota=@idNota",
  deleteNota:
    "DELETE FROM materiaNota WHERE idNota=@idNota DELETE FROM nota WHERE idNota = @idNota",
  updateStatus:
    "UPDATE estudianteMateria SET status=@status WHERE idEstudiante=@idEstudiante AND idMateria=@idMateria",
  //CONSULTAS DECANO
  getDecanoById: "SELECT * FROM decano WHERE idUsuario = @id",
  newDecano:
    "INSERT INTO decano(nombre,apellido,CI,idUsuario) VALUES (@nombre,@apellido,@CI,@idUsuario)",
  newCarrera:
    "INSERT INTO malla(nombreMalla,idDecano) VALUES (@nombreMalla,@idDecano)",
  newSemestre:
    "INSERT INTO semestre(nombreSemestre,idMalla) VALUES (@nombreSemestre,@idMalla)",
  newMateria:
    "INSERT INTO materia(nombreMateria,idSemestre,codigo,horasTeoricas,horasPracticas,creditos,requisito,costo) VALUES (@nombreMateria,@idSemestre,@codigo,@horasTeoricas,@horasPracticas,@creditos,@requisito,@costo)",
  deleteMateria: "DELETE FROM materia WHERE idMateria = @id",
  updateMateria:
    "UPDATE materia SET nombreMateria=@nombreMateria,codigo=@codigo,horasTeoricas=@horasTeoricas,horasPracticas=@horasPracticas,creditos=@creditos,requisito=@requisito,costo=@costo WHERE idMateria=@idMateria",
  ///CONSULTAR CARRERAS DISPONIBLES
  getCarreras: "SELECT * FROM malla",
  //CONSULTAR SEMESTRE DE MALLA
  getSemestre: "SELECT * FROM semestre WHERE idMalla=@idMalla",
  ///CONSULTA DE MATERIA POR SEMESTRE
  getMaterias:
    "SELECT idMateria,nombreMateria,codigo,horasTeoricas,horasPracticas,creditos,requisito,costo FROM materia M,semestre S WHERE M.idSemestre = @id and S.idMalla = @idMalla and S.idSemestre = @id",
};

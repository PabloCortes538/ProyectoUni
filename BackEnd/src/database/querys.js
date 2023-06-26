export const queries = {
    ///CONSULTAS USUARIOS    
    getAutenticacion: "SELECT usuario,password,idUsuario,rol FROM usuario WHERE usuario=@usuario and password= @password",
    newUsuario:"INSERT INTO usuario(usuario,password,email,rol) VALUES (@usuario,@password,@email,@rol)",
    ///CONSULTAS ESTUDIANTE
    getEstudianteById:"SELECT * FROM estudiante WHERE idUsuario = @id",
    newEstudiante:"INSERT INTO estudiante(nombre,apellido,CI,idMalla,idUsuario) VALUES (@nombre,@apellido,@CI,@idMalla,@idUsuario)",
    addMateria:"INSERT INTO estudianteMateria(idEstudiante,idMateria,status) VALUES (@idEstudiante,@idMateria,@status)",
    getEstudianteMaterias:"SELECT idMateria,status FROM estudiante E,estudianteMateria EM WHERE EM.idEstudiante=@idEstudiante and E.idEstudiante=@idEstudiante",
    getMateriasEst:"SELECT idMateria,nombreMateria,codigo,horasTeoricas,horasPracticas,creditos,requisito,costo FROM materia WHERE idMateria=@idMateria",
    //CONSULTAS DECANO
    getDecanoById:"SELECT * FROM decano WHERE idUsuario = @id",
    newDecano:"INSERT INTO decano(nombre,apellido,CI,idUsuario) VALUES (@nombre,@apellido,@CI,@idUsuario)",
    newCarrera:"INSERT INTO malla(nombreMalla,idDecano) VALUES (@nombreMalla,@idDecano)",
    getCarrera:"SELECT idMalla FROM malla WHERE nombreMalla=@nombreMalla",
    newSemestre:"INSERT INTO semestre(nombreSemestre,idMalla) VALUES (@nombreSemestre,@idMalla)",
    newMateria:"INSERT INTO materia(nombreMateria,idSemestre,codigo,horasTeoricas,horasPracticas,creditos,requisito,costo) VALUES (@nombreMateria,@idSemestre,@codigo,@horasTeoricas,@horasPracticas,@creditos,@requisito,@costo)",
    deleteMateria:"DELETE FROM [UniversidadDB].[dbo].[materia] WHERE idMateria = @id",
    updateMateria:"UPDATE materia SET nombreMateria=@nombreMateria,codigo=@codigo,horasTeoricas=@horasTeoricas,horasPracticas=@horasPracticas,creditos=@creditos,requisito=@requisito,costo=@costo WHERE idMateria=@idMateria",
    ///CONSULTAR CARRERAS DISPONIBLES
    getCarreras:"SELECT * FROM malla",
    //CONSULTAR SEMESTRE DE MALLA
    getSemestre:"SELECT * FROM semestre WHERE idMalla=@idMalla",
    ///CONSULTA DE MATERIA POR SEMESTRE
    getMaterias:"SELECT idMateria,nombreMateria,codigo,horasTeoricas,horasPracticas,creditos,requisito,costo FROM materia M,semestre S WHERE M.idSemestre = @id and S.idMalla = @idMalla and S.idSemestre = @id"

}
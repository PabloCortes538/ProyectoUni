export const queries = {
    ///CONSULTAS USUARIOS    
    getAutenticacion: "SELECT usuario,password,idUsuario,rol FROM usuario WHERE usuario=@usuario and password= @password",
    newUsuario:"INSERT INTO usuario(usuario,password,email,rol) VALUES (@usuario,@password,@email,@rol)",
    ///CONSULTAS ESTUDIANTE
    getEstudianteById:"SELECT * FROM estudiante WHERE idUsuario = @id",
    newEstudiante:"INSERT INTO estudiante(nombre,apellido,CI,idMalla,idUsuario) VALUES (@nombre,@apellido,@CI,@idMalla,@idUsuario)",
    //CONSULTAS DECANO
    getDecanoById:"SELECT * FROM decano WHERE idUsuario = @id",
    newDecano:"INSERT INTO decano(nombre,apellido,CI,idUsuario) VALUES (@nombre,@apellido,@CI,@idUsuario)",
    ///CONSULTAR CARRERAS DISPONIBLES
    getCarreras:"SELECT * FROM malla",
    //CONSULTAR SEMESTRE DE MALLA
    getSemestre:"SELECT * FROM semestre WHERE idMalla=@idMalla",
    ///CONSULTA DE MATERIA POR SEMESTRE
    getMaterias:"SELECT idMateria,nombreMateria,codigo,horasTeoricas,horasPracticas,creditos,requisito,costo FROM materia M,semestre S WHERE M.idSemestre = @id and S.idMalla = @idMalla and S.idSemestre = @id"

}
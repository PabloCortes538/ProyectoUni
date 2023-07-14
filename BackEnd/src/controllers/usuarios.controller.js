
import { getConnection, queries, sql } from "../database";
//Consulta Usuario
export const getUsuarioById = async (req, res) => {
    const { usuario, password } = req.body
    if (usuario == null || password == null) {
        res.status(404)
        res.send("No Exites")
    }
    try{
    const pool = await getConnection();
    const result = await pool.request()
        .input("usuario", sql.VarChar, usuario)
        .input("password", sql.VarChar, password)
        .query(queries.getAutenticacion)   
    res.json(result.recordset[0])
    }catch(error){
        res.send(error.menssage)
    }
    
}
//Crear un nuevo Usuario
export const newUsuario = async (req, res) => {
    const { usuario, password, email, rol} = req.body
    try {
        if (usuario == null || password == null ||email==null) {
            res.status(404)
            res.send("No Exites")
        }
        const pool = await getConnection();
        const result = await pool.request()
            .input("usuario", sql.VarChar, usuario)
            .input("password", sql.VarChar, password)
            .input("email", sql.VarChar, email)
            .input("rol",sql.VarChar,rol)
            .query(queries.newUsuario)     
        res.json(usuario,password,email,rol)        
    } catch (error) {
        res.send(error.menssage)
    }
    
}
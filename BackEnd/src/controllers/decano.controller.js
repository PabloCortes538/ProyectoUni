import { getConnection, queries, sql } from "../database";

export const newCarrera = async (req, res) => {
    const { nombreMalla, idDecano } = req.body
    try {
        const pool = await getConnection();
        await pool.request()
            .input("nombreMalla", sql.VarChar, nombreMalla)
            .input("idDecano", sql.Int, idDecano)
            .query(queries.newCarrera)
        res.json({ nombreMalla, idDecano })
    } catch (error) {
        res.send(error.message)
    }
}
export const newSemestre = async (req, res) => {
    const { idMalla, nombreSemestre } = req.body
    try {
        const pool = await getConnection()        
        const resultado = await pool.request()
            .input("nombreSemestre", sql.VarChar, nombreSemestre)
            .input("idMalla", sql.Int, idMalla)
            .query(queries.newSemestre)
        res.json(resultado.recordset)
    } catch (error) {
        res.send(error.message)
    }
}
export const newMateria = async (req, res) => {
    const { idSemestre,nombreMateria, horasTeoricas, horasPracticas, creditos, codigo, costo, requisito } = req.body
    
    try {
        const pool = await getConnection()
        await pool.request()        
        .input("nombreMateria",sql.VarChar,nombreMateria)
        .input("idSemestre",sql.Int,idSemestre)
        .input("codigo",sql.VarChar,codigo)
        .input("horasTeoricas",sql.Int,horasTeoricas)
        .input("horasPracticas",sql.Int,horasPracticas)
        .input("creditos",sql.Int,creditos)
        .input("requisito",sql.VarChar,requisito)
        .input("costo",sql.Int,costo)        
        .query(queries.newMateria)       
        res.json(nombreMateria)
    } catch (error) {
        res.send(error)
    }
}
export const deleteMateriaById = async (req,res)=>{
    const{id}= req.params
    try {
        const pool = await getConnection()
        await pool
        .request()
        .input("id",sql.Int,id)
        .query(queries.deleteMateria)
        res.sendStatus(204) 
    } catch (error) {
        res.send(error)
    }
           
}
export const updateMateriaById = async (req,res)=>{
    const{nombreMateria,codigo,horasTeoricas,horasPracticas,creditos,requisito,costo}=req.body
    const{id}=req.params
    try {
        const pool = await getConnection()
        await pool
        .request()        
        .input("idMateria",sql.Int,id)
        .input("nombreMateria",sql.VarChar,nombreMateria)
        .input("codigo",sql.VarChar,codigo)
        .input("horasTeoricas",sql.Int,horasTeoricas)
        .input("horasPracticas",sql.Int,horasPracticas)
        .input("creditos",sql.Int,creditos)
        .input("requisito",sql.VarChar,requisito)
        .input("costo",sql.Int,costo)
        .query(queries.updateMateria)
        res.sendStatus(204)
    } catch (error) {
        res.send(error)
        
    }
}
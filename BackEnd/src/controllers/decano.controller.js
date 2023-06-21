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
    const { nombreMalla, nombreSemestre } = req.body
    try {
        const pool = await getConnection()
        const result = await pool.request()
            .input("nombreMalla", sql.VarChar, nombreMalla)
            .query(queries.getCarrera)          
        const resultado = await pool.request()
            .input("nombreSemestre", sql.VarChar, nombreSemestre)
            .input("idMalla", sql.Int, result.recordset[0].idMalla)
            .query(queries.newSemestre)        
        res.send("Nueva Carrera Creada")
    } catch (error) {
        res.send(error.message)
    }
}
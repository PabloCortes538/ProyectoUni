import { getConnection, queries, sql } from "../database";
export const getSemestre = async (req, res) => {
    const { id } = req.params
    try {
        const pool = await getConnection()
        const result = await pool.request()
            .input("idMalla", sql.Int, id)
            .query(queries.getSemestre)
        res.json(result.recordset)
    } catch (error) {
        res.send(error.menssage)
    }

}
export const getMaterias = async (req, res) => {
    const { id, idMalla } = req.body
    try {
        const pool = await getConnection()
        const result = await pool.request()
            .input("id", sql.Int, id)
            .input('idMalla', sql.Int, idMalla)
            .query(queries.getMaterias)
        res.json(result.recordset)
    } catch (error) {
        res.send(error.menssage)
    }

}

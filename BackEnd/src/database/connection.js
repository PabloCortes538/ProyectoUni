import sql from 'mssql';

const dbSetting = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'UniversidadDB',
    options:{
        encrypt: true,
        trustServerCertificate: true
    }
}
export async function getConnection(){
    try{
        const pool = await sql.connect(dbSetting);
        return pool;
    }catch(error){
        console.error(error);
    }
}
export {sql};
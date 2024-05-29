import mysql2 from "mysql2"

const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cursos"
})

db.connect((error)=>{
    if(error){
        throw new Error("Error en la conexion")
    }
    console.log("Base de datos conectada")
})

export default db
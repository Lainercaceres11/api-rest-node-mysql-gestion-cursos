import express from "express"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

import studentRouter from "./routes/studentsRoutes.js"
import teacherRouter from "./routes/teachersRoutes.js"
import cursosRouter from "./routes/cursosRoutes.js"

const app = express()

const port = process.env.PORT

// midd
app.use(express.json())
app.use(cors())

// Routes
app.use("/estudiantes", studentRouter)
app.use("/profesores", teacherRouter )
app.use("/cursos", cursosRouter )

app.listen(port, ()=>{
    console.log(`Applicacion corriendo en el puerto ${port} `)
})


import { Router } from "express";

import CursosController from "../controllers/cursosController.js";

const cursosRouter = Router()

const cursosController = new CursosController()

cursosRouter.get("/", cursosController.getCursos)

cursosRouter.get("/:id", cursosController.detailsCurso)

cursosRouter.post("/", cursosController.add)
cursosRouter.post("/registrar-estudiante", cursosController.asociarStudiante)

cursosRouter.put("/:id", cursosController.update)

cursosRouter.delete("/:id", cursosController.delete)

export default cursosRouter
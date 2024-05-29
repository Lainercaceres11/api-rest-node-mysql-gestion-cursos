import { Router } from "express";

import StudentsController from "../controllers/studentController.js";

const studentRouter = Router()

const studentsController = new StudentsController()

studentRouter.get("/", studentsController.getStudents)

studentRouter.get("/:id", studentsController.getDetailsStudent)

studentRouter.post("/", studentsController.addStudent)

studentRouter.put("/:id", studentsController.updateStudent)

studentRouter.delete("/:id", studentsController.deleteStudent)

export default studentRouter
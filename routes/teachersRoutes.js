import { Router } from "express";

import TeachersController from "../controllers/teacherController.js";

const teacherRouter = Router()

const teacherController = new TeachersController()

teacherRouter.get("/", teacherController.getTeachers)

teacherRouter.get("/:id", teacherController.getDetailsTeacher)

teacherRouter.post("/", teacherController.addTeacher)

teacherRouter.put("/:id", teacherController.updateTeacher)

teacherRouter.delete("/:id", teacherController.deleteTeacher)

export default teacherRouter
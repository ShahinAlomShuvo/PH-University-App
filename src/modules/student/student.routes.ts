import express from "express";
import { StudentController } from "./student.controller";
const router = express.Router();

router.post("/", StudentController.createStudent);
router.get("/", StudentController.getAllStudents);
router.get("/:id", StudentController.getStudentById);
router.delete("/:id", StudentController.deleteStudent);
export const StudentRoutes = router;

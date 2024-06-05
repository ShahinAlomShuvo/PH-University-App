import express from "express";
import { StudentController } from "./student.controller";
import validateRequest from "../../middleware/validateRequest.middleware";
import { studentValidation } from "./student.validation";
const router = express.Router();

router.get("/", StudentController.getAllStudents);
router.get("/:id", StudentController.getStudentById);
router.patch(
  "/:id",
  validateRequest(studentValidation.updateStudentValidationSchema),
  StudentController.updateStudent
);
router.delete("/:id", StudentController.deleteStudent);
export const StudentRoutes = router;

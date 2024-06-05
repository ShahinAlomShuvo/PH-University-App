import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middleware/validateRequest.middleware";
import { createStudentValidationSchema } from "../student/student.validation";
const router = express.Router();

router.post(
  "/",
  // validateRequest(createStudentValidationSchema),
  UserController.createStudent
);

export const UserRoutes = router;

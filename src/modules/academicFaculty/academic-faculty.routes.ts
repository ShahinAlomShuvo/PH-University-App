import express from "express";
import { AcademicFacultyControllers } from "./academic-faculty.controller";
import validateRequest from "../../middleware/validateRequest.middleware";
import { AcademicFacultyValidation } from "./academic-faculty.validation";
const router = express.Router();
router.post(
  "/create-academic-faculty",
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.createAcademicFaculty
);
router.get("/", AcademicFacultyControllers.getAllAcademicFaculties);
router.get("/:id", AcademicFacultyControllers.getAcademicFacultyById);
router.patch(
  "/:id",
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema
  ),
  AcademicFacultyControllers.updateAcademicFaculty
);
export const AcademicFacultyRoutes = router;

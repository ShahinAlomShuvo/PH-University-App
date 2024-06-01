import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middleware/validateRequest.middleware";
import { AcademicSemesterValidation } from "./academicSemester.validation";
const router = express.Router();

router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
);

router.get("/", AcademicSemesterControllers.getAllAcademicSemesters);
router.get("/:id", AcademicSemesterControllers.getAcademicSemesterById);
router.patch(
  "/:id",
  validateRequest(
    AcademicSemesterValidation.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.updateAcademicSemester
);
export const AcademicSemesterRoutes = router;

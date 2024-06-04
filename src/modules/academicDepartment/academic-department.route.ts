import express from "express";
import { AcademicDepartmentControllers } from "./academic-department.controller";
import validateRequest from "../../middleware/validateRequest.middleware";
import { AcademicDepartmentValidation } from "./academic-department.validation";
const router = express.Router();

router.post(
  "/create-academic-department",
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.createAcademicDepartment
);

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartments);
router.get("/:id", AcademicDepartmentControllers.getAcademicDepartmentById);
router.patch(
  "/:id",
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.updateAcademicDepartment
);
export const AcademicDepartmentRoutes = router;

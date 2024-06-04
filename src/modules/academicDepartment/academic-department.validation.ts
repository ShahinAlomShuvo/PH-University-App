import { z } from "zod";

const createAcademicDepartmentValidationSchema = z.object({
  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string",
  }),
  academicFaculty: z.string({
    required_error: "Academic Faculty is required",
    invalid_type_error: "Academic faculty must be a string",
  }),
});

const updateAcademicDepartmentValidationSchema =
  createAcademicDepartmentValidationSchema.partial();

export const AcademicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};

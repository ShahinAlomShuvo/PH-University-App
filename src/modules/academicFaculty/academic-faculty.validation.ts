import { z } from "zod";

const createAcademicFacultyValidationSchema = z.object({
  name: z.string({
    required_error: "Academic Faculty name is required",
    invalid_type_error: "Academic faculty name must be a string",
  }),
});

const updateAcademicFacultyValidationSchema =
  createAcademicFacultyValidationSchema.partial();

export const AcademicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};

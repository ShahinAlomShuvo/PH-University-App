import { z } from "zod";

const AcademicFacultyValidationSchema = z.object({
  name: z.string({
    required_error: "Academic Faculty name is required",
    invalid_type_error: "Academic faculty name must be a string",
  }),
});

const updateAcademicFacultyValidationSchema =
  AcademicFacultyValidationSchema.partial();

export const academicFacultyValidation = {
  AcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};

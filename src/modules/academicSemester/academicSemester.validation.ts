import { z } from "zod";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academicSemester.constant";

const createAcademicSemesterValidationSchema = z.object({
  name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
  year: z.string(),
  code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
  startMonth: z.enum([...Months] as [string, ...string[]]),
  endMonth: z.enum([...Months] as [string, ...string[]]),
});

const updateAcademicSemesterValidationSchema =
  createAcademicSemesterValidationSchema.partial();

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};

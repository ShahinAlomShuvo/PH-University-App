import { z } from "zod";
import {
  partialUserNameValidationSchema,
  userNameValidationSchema,
} from "../../common/common.validation";
import { BloodGroup, Gender } from "../../common/common.constant";

const createFacultyValidationSchema = z.object({
  designation: z.string().optional(),
  name: userNameValidationSchema,
  gender: z.enum([...Gender] as [string, ...string[]]).optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().email().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  profileImg: z.string().optional(),
  academicDepartment: z.string().optional(),
});

const updateFacultyValidationSchema = createFacultyValidationSchema
  .partial()
  .extend({
    name: partialUserNameValidationSchema.optional(),
  });

export const facultyValidation = {
  createFacultyValidationSchema,
  updateFacultyValidationSchema,
};

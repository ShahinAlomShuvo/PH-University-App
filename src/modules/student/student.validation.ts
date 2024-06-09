import { z } from "zod";
import { BloodGroup, Gender } from "../../common/common.constant";

// Define the nested schemas first
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  middleName: z.string().min(1).max(20).optional(),
  lastName: z.string().min(1).max(20),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1).max(20),
  fatherOccupation: z.string().min(1).max(20),
  fatherContactNo: z.string().min(10).max(15),
  motherName: z.string().min(1).max(20),
  motherOccupation: z.string().min(1).max(20),
  motherContactNo: z.string().min(10).max(15),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1).max(20),
  occupation: z.string().min(1).max(20),
  contactNo: z.string().min(10).max(15),
  address: z.string().min(1).max(100),
});

// Define the main schema
export const createStudentValidationSchema = z.object({
  name: userNameValidationSchema,
  gender: z.enum([...Gender] as [string, ...string[]]),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string().min(10).max(15),
  emergencyContactNo: z.string().min(10).max(15),
  bloodGroup: z.enum([...BloodGroup] as [string, ...string[]]).optional(),
  presentAddress: z.string().min(1).max(100),
  permanentAddress: z.string().min(1).max(100),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  admissionSemester: z.string(),
  academicDepartment: z.string(),
});

const partialUserNameValidationSchema = userNameValidationSchema.partial();
const partialGuardianValidationSchema = guardianValidationSchema.partial();
const partialLocalGuardianValidationSchema =
  localGuardianValidationSchema.partial();
const updateStudentValidationSchema = createStudentValidationSchema
  .partial()
  .extend({
    name: partialUserNameValidationSchema.optional(),
    guardian: partialGuardianValidationSchema.optional(),
    localGuardian: partialLocalGuardianValidationSchema.optional(),
  });
// Export the validation schema
export const studentValidation = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};

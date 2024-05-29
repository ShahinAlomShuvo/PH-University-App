import { z } from "zod";

const createUserValidationSchema = z.object({
  password: z
    .string({ invalid_type_error: "Password must be a string" })
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long")
    .optional(),
});

export const userValidation = {
  createUserValidationSchema,
};

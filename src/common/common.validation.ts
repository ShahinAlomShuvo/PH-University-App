import { z } from "zod";

export const userNameValidationSchema = z.object({
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

export const partialUserNameValidationSchema =
  userNameValidationSchema.partial();

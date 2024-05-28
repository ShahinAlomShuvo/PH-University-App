import { z } from "zod";

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long"),
  needPasswordChange: z.boolean().default(true).optional(),
  role: z.enum(["admin", "faculty", "student"]),
  status: z.enum(["in-progress", "blocked"]).default("in-progress"),
  isDeleted: z.boolean().default(false).optional(),
});

export default userValidationSchema;

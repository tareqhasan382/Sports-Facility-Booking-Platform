import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().min(11, "Phone number must be at least 10 digits"),
    role: z.enum(["ADMIN", "USER"]).optional(),
    address: z.string(),
  }),
});

export const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  }),
});

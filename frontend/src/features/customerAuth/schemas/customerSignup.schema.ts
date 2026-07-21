import { z } from "zod";

export const customerSignupSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.union([z.literal(""), z.string().email("Enter a valid email")]).optional(),
});

export type CustomerSignupSchema = z.infer<typeof customerSignupSchema>;

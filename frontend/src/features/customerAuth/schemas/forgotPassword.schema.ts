import { z } from "zod";

export const forgotPasswordSchema = z.object({
  phone: z.string().regex(/^9[678]\d{8}$/, "Enter a valid 10-digit phone number"),
});

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

import { z } from "zod";

export const customerLoginSchema = z.object({
  phone: z.string().min(10, "Enter a valid phone number"),
  password: z.string().min(1, "Password is required"),
});

export type CustomerLoginSchema = z.infer<typeof customerLoginSchema>;

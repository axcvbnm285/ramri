import { z } from "zod";

export const signupSchema = z.object({
  storeName: z.string().min(2, "Store name is required"),
  ownerName: z.string().min(2, "Your name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupSchema = z.infer<typeof signupSchema>;

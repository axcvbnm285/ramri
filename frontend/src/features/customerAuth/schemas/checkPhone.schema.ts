import { z } from "zod";

export const checkPhoneSchema = z.object({
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
});

export type CheckPhoneSchema = z.infer<typeof checkPhoneSchema>;

import { loginSchema, registerSchema } from "@/lib/schema";
import { z } from "zod";

// client
export type ButtonVariants = "primary" | "inverted";

export type RegisterInputs = z.infer<typeof registerSchema>;

export type LoginInputs = z.infer<typeof loginSchema>;

// server
export type ApiErrorResponse = {
  status: number;
  message: string;
};

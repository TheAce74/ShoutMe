import {
  addEmergencySchema,
  loginSchema,
  profileSchema,
  registerSchema,
} from "@/lib/schema";
import { z } from "zod";

// client
export type ButtonVariants = "primary" | "inverted" | "active" | "resolved";

export type RegisterInputs = z.infer<typeof registerSchema>;

export type LoginInputs = z.infer<typeof loginSchema>;

export type AddEmergencyInputs = z.infer<typeof addEmergencySchema>;

export type ProfileInputs = z.infer<typeof profileSchema>;

// server
export type ApiErrorResponse = {
  status: number;
  message: string;
};

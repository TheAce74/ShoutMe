import { PASSWORD_REGEX } from "@/lib/constants";
import { isValidFile } from "@/lib/utils";
import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, "Enter your full name"),
    email: z
      .string()
      .min(1, "Enter your email address")
      .email("Enter a valid email address"),
    phoneNumber: z.string().min(1, "Enter your phone number"),
    location: z.string().min(1, "Enter your location"),
    password: z
      .string()
      .regex(
        PASSWORD_REGEX,
        "Password must contain an uppercase letter, a lowercase letter, a digit, and a special character"
      )
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .regex(
        PASSWORD_REGEX,
        "Password must contain an uppercase letter, a lowercase letter, a digit, and a special character"
      )
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Enter your email address")
    .email("Enter a valid email address"),
  password: z
    .string()
    .regex(
      PASSWORD_REGEX,
      "Password must contain an uppercase letter, a lowercase letter, a digit, and a special character"
    )
    .min(8, "Password must be at least 8 characters long"),
});

export const addEmergencySchema = z.object({
  title: z.string().min(1, "Enter emergency title"),
  location: z.string().min(1, "Enter emergency location"),
  description: z.string().min(1, "Enter emergency description"),
});

export const profileSchema = z
  .object({
    name: z.string().min(1, "Enter your full name"),
    email: z
      .string()
      .min(1, "Enter your email address")
      .email("Enter a valid email address"),
    phoneNumber: z.string().min(1, "Enter your phone number"),
    location: z.string().min(1, "Enter your location"),
    password: z.string().optional(),
    profilePicture: z
      .instanceof(File)
      .refine((file) => isValidFile(file, 5), {
        message:
          "Only .jpg, .jpeg, and .png formats are supported and image must be less than or equal to 5MB",
      })
      .or(z.string())
      .optional(),
  })
  .refine(
    (data) =>
      !data.password
        ? true
        : PASSWORD_REGEX.test(data.password) && data.password.length >= 8,
    {
      message:
        "Password must contain an uppercase letter, a lowercase letter, a digit, and a special character and must be at least 8 characters long",
      path: ["password"],
    }
  );

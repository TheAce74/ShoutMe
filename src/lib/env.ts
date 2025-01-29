import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string(),
  NEXT_PUBLIC_ENCRYPTION_KEY: z.string(),
  NEXT_PUBLIC_GOOGLE_API_KEY: z.string(),
});

const runtimeEnv = {
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_ENCRYPTION_KEY: process.env.NEXT_PUBLIC_ENCRYPTION_KEY,
  NEXT_PUBLIC_GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
};

export const ENV = envSchema.parse(runtimeEnv);

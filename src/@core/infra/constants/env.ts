import { z } from "zod";

const envSchema = z.object({
  USERNAME: z.string({
    required_error: "USERNAME is required",
  }),
  PASSWORD: z.string({
    required_error: "PASSWORD is required",
  }),

  NEXTAUTH_SECRET: z.string({
    required_error: "NEXTAUTH_SECRET is required",
  }),
  NEXTAUTH_URL: z.string({
    required_error: "NEXTAUTH_URL is required",
  }),

  DATABASE_URL: z.string({
    required_error: "DATABASE_URL is required",
  }),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;

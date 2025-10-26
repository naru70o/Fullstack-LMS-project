import * as z from "zod";

export const signupSchema = z.object({
  name: z.string().trim().min(4).max(24),
  email: z.email(),
  password: z.string().trim().min(8).max(24),
  passwordConfirm: z.string().trim().min(8).max(24),
});

export const signinSchema = z.object({
  email: z.email(),
  password: z.string().trim().min(8).max(24),
});

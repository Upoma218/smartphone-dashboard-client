import { z } from "zod";

export const passwordFormat =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{6,}$/;

export const userSchema = z.object({
    userId: z.string(),
    email: z.string().email({
      message: "Invalid Email format.",
    }),
    password: z.string().refine((value: string) => passwordFormat.test(value), {
      message:
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
    }),
    role: z.string(),
  });
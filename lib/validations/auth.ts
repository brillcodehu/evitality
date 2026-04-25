import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Az email cím megadása kötelező")
    .email("Érvénytelen email cím"),
  password: z
    .string()
    .min(1, "A jelszó megadása kötelező"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "A név legalább 2 karakter legyen")
      .max(100, "A név maximum 100 karakter lehet"),
    email: z
      .string()
      .min(1, "Az email cím megadása kötelező")
      .email("Érvénytelen email cím"),
    password: z
      .string()
      .min(8, "A jelszó legalább 8 karakter legyen")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "A jelszónak tartalmaznia kell kisbetűt, nagybetűt és számot"
      ),
    confirmPassword: z
      .string()
      .min(1, "A jelszó megerősítése kötelező"),
    phone: z
      .string()
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "A jelszavak nem egyeznek meg",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

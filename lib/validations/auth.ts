import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Az email cim megadasa kotelezo")
    .email("Ervenytelen email cim"),
  password: z
    .string()
    .min(1, "A jelszo megadasa kotelezo"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "A nev legalabb 2 karakter legyen")
      .max(100, "A nev maximum 100 karakter lehet"),
    email: z
      .string()
      .min(1, "Az email cim megadasa kotelezo")
      .email("Ervenytelen email cim"),
    password: z
      .string()
      .min(8, "A jelszo legalabb 8 karakter legyen")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "A jelszonak tartalmaznia kell kisbetut, nagybetut es szamot"
      ),
    confirmPassword: z
      .string()
      .min(1, "A jelszo megerositese kotelezo"),
    phone: z
      .string()
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "A jelszavak nem egyeznek",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;

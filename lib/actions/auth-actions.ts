"use server";

import { signIn } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { AuthError } from "next-auth";

export async function registerUser(formData: FormData) {
  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
    phone: (formData.get("phone") as string) || undefined,
  };

  const validatedFields = registerSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues[0].message,
    };
  }

  const { name, email, password, phone } = validatedFields.data;

  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return {
        success: false,
        error: "Ez az email cím már regisztrált",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      phone: phone || null,
      role: "client",
    });

    return {
      success: true,
      message: "Sikeres regisztráció",
    };
  } catch {
    return {
      success: false,
      error: "Hiba történt a regisztráció során",
    };
  }
}

export async function loginUser(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = loginSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.issues[0].message,
    };
  }

  try {
    await signIn("credentials", {
      email: rawData.email,
      password: rawData.password,
      redirect: false,
    });

    return {
      success: true,
      message: "Sikeres bejelentkezés",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            success: false,
            error: "Hibás email cím vagy jelszó",
          };
        default:
          return {
            success: false,
            error: "Hiba történt a bejelentkezés során",
          };
      }
    }
    throw error;
  }
}

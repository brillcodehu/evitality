"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { clientProfiles, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateClientProfile(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Be kell jelentkezned" };
  }

  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const fitnessGoals = formData.get("fitnessGoals") as string;
  const healthConditions = formData.get("healthConditions") as string;

  try {
    await db
      .update(users)
      .set({ name, phone })
      .where(eq(users.id, session.user.id));

    const existing = await db
      .select()
      .from(clientProfiles)
      .where(eq(clientProfiles.userId, session.user.id));

    if (existing.length > 0) {
      await db
        .update(clientProfiles)
        .set({
          fitnessGoals: fitnessGoals ? JSON.parse(`["${fitnessGoals}"]`) : [],
          healthConditions: healthConditions ? JSON.parse(`["${healthConditions}"]`) : [],
          updatedAt: new Date(),
        })
        .where(eq(clientProfiles.userId, session.user.id));
    } else {
      await db.insert(clientProfiles).values({
        userId: session.user.id,
        fitnessGoals: fitnessGoals ? [fitnessGoals] : [],
        healthConditions: healthConditions ? [healthConditions] : [],
      });
    }

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch {
    return { error: "Hiba történt a profil mentése során" };
  }
}

export async function getClients() {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "trainer") {
    return { error: "Nincs jogosultságod", clients: [] };
  }

  try {
    const clients = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        phone: users.phone,
        isActive: users.isActive,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(eq(users.role, "client"));

    return { clients };
  } catch {
    return { error: "Hiba történt", clients: [] };
  }
}

export async function getClientDetail(clientId: string) {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "trainer") {
    return { error: "Nincs jogosultságod" };
  }

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, clientId));

    const [profile] = await db
      .select()
      .from(clientProfiles)
      .where(eq(clientProfiles.userId, clientId));

    return { user, profile };
  } catch {
    return { error: "Hiba történt" };
  }
}

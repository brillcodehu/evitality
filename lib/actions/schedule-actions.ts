"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { availabilitySlots } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createSlot(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "trainer") {
    return { error: "Nincs jogosultságod" };
  }

  const dayOfWeek = parseInt(formData.get("dayOfWeek") as string);
  const startTime = formData.get("startTime") as string;
  const endTime = formData.get("endTime") as string;
  const sessionType = formData.get("sessionType") as
    | "personal"
    | "group"
    | "online";
  const maxCapacity = parseInt(formData.get("maxCapacity") as string) || 1;

  if (isNaN(dayOfWeek) || !startTime || !endTime || !sessionType) {
    return { error: "Hiányzó adatok" };
  }

  try {
    const [slot] = await db
      .insert(availabilitySlots)
      .values({
        trainerId: session.user.id,
        dayOfWeek,
        startTime,
        endTime,
        sessionType,
        maxCapacity,
        isRecurring: true,
        isActive: true,
      })
      .returning();

    revalidatePath("/admin/schedule");
    return { success: true, slot };
  } catch {
    return { error: "Hiba történt az időpont létrehozása során" };
  }
}

export async function deleteSlot(slotId: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "trainer") {
    return { error: "Nincs jogosultságod" };
  }

  try {
    await db
      .delete(availabilitySlots)
      .where(eq(availabilitySlots.id, slotId));

    revalidatePath("/admin/schedule");
    return { success: true };
  } catch {
    return { error: "Hiba történt az időpont törlése során" };
  }
}

export async function toggleSlot(slotId: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "trainer") {
    return { error: "Nincs jogosultságod" };
  }

  try {
    const [existing] = await db
      .select({ isActive: availabilitySlots.isActive })
      .from(availabilitySlots)
      .where(eq(availabilitySlots.id, slotId));

    if (!existing) {
      return { error: "Időpont nem található" };
    }

    await db
      .update(availabilitySlots)
      .set({
        isActive: !existing.isActive,
        updatedAt: new Date(),
      })
      .where(eq(availabilitySlots.id, slotId));

    revalidatePath("/admin/schedule");
    return { success: true };
  } catch {
    return { error: "Hiba történt a módosítás során" };
  }
}

export async function getSlots() {
  try {
    const slots = await db
      .select()
      .from(availabilitySlots)
      .orderBy(asc(availabilitySlots.dayOfWeek), asc(availabilitySlots.startTime));

    return { slots };
  } catch {
    return { slots: [] };
  }
}

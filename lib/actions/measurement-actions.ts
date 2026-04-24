"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { measurements } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addMeasurement(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Be kell jelentkezned" };
  }

  const weight = formData.get("weight")
    ? parseFloat(formData.get("weight") as string)
    : null;
  const bodyFatPercentage = formData.get("bodyFat")
    ? parseFloat(formData.get("bodyFat") as string)
    : null;
  const chest = formData.get("chest")
    ? parseFloat(formData.get("chest") as string)
    : null;
  const waist = formData.get("waist")
    ? parseFloat(formData.get("waist") as string)
    : null;
  const hips = formData.get("hips")
    ? parseFloat(formData.get("hips") as string)
    : null;
  const leftArm = formData.get("biceps")
    ? parseFloat(formData.get("biceps") as string)
    : null;
  const leftThigh = formData.get("thigh")
    ? parseFloat(formData.get("thigh") as string)
    : null;

  if (!weight) {
    return { error: "A testsúly megadása kötelező" };
  }

  try {
    const [measurement] = await db
      .insert(measurements)
      .values({
        clientId: session.user.id,
        date: new Date().toISOString().split("T")[0],
        weight,
        bodyFatPercentage,
        chest,
        waist,
        hips,
        leftArm,
        leftThigh,
      })
      .returning();

    revalidatePath("/dashboard/progress");
    return { success: true, measurement };
  } catch {
    return { error: "Hiba történt a mérés rögzítése során" };
  }
}

export async function getMeasurements(clientId?: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Be kell jelentkezned", measurements: [] };
  }

  const targetId = clientId || session.user.id;

  try {
    const result = await db
      .select()
      .from(measurements)
      .where(eq(measurements.clientId, targetId))
      .orderBy(desc(measurements.date));

    return { measurements: result };
  } catch {
    return { error: "Hiba történt", measurements: [] };
  }
}

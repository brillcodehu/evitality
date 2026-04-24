"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { programs, programExercises, clientPrograms } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createProgram(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "trainer") {
    return { error: "Nincs jogosultságod" };
  }

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const durationWeeks = parseInt(formData.get("durationWeeks") as string) || null;
  const difficulty = (formData.get("difficulty") as string) || "beginner";
  const tags = formData.get("tags") as string;

  if (!name) {
    return { error: "A név kötelező" };
  }

  try {
    const [program] = await db
      .insert(programs)
      .values({
        trainerId: session.user.id,
        name,
        description,
        durationWeeks,
        difficulty: difficulty as "beginner" | "intermediate" | "advanced",
        isTemplate: true,
        tags: tags ? tags.split(",").map((t) => t.trim()) : null,
      })
      .returning();

    revalidatePath("/admin/programs");
    return { success: true, program };
  } catch {
    return { error: "Hiba történt a program létrehozása során" };
  }
}

export async function assignProgramToClient(
  clientId: string,
  programId: string,
  startDate: string
) {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "trainer") {
    return { error: "Nincs jogosultságod" };
  }

  try {
    const [program] = await db
      .select()
      .from(programs)
      .where(eq(programs.id, programId));

    if (!program) return { error: "Program nem található" };

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (program.durationWeeks || 12) * 7);

    await db.insert(clientPrograms).values({
      clientId,
      programId,
      startDate: new Date(startDate),
      endDate,
      isActive: true,
    });

    revalidatePath("/admin/clients");
    return { success: true };
  } catch {
    return { error: "Hiba történt a program kiosztása során" };
  }
}

export async function deleteProgram(programId: string) {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "trainer") {
    return { error: "Nincs jogosultságod" };
  }

  try {
    await db.delete(programExercises).where(eq(programExercises.programId, programId));
    await db.delete(programs).where(eq(programs.id, programId));

    revalidatePath("/admin/programs");
    return { success: true };
  } catch {
    return { error: "Hiba történt a program törlése során" };
  }
}

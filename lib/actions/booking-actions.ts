"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { bookings, availabilitySlots } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Be kell jelentkezned a foglaláshoz" };
  }

  const slotId = formData.get("slotId") as string;
  const date = formData.get("date") as string;
  const notes = formData.get("notes") as string | null;

  if (!slotId || !date) {
    return { error: "Hiányzó adatok" };
  }

  try {
    const result = await db.transaction(async (tx) => {
      const existingBooking = await tx
        .select()
        .from(bookings)
        .where(
          and(
            eq(bookings.slotId, slotId),
            eq(bookings.date, date),
            eq(bookings.status, "confirmed")
          )
        );

      if (existingBooking.length > 0) {
        throw new Error("Ez az időpont már foglalt");
      }

      const [newBooking] = await tx
        .insert(bookings)
        .values({
          clientId: session.user.id,
          slotId,
          date,
          status: "confirmed",
          notes,
        })
        .returning();

      return newBooking;
    });

    revalidatePath("/dashboard/bookings");
    revalidatePath("/admin/bookings");

    return { success: true, booking: result };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Hiba történt a foglalás során" };
  }
}

export async function cancelBooking(bookingId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Be kell jelentkezned" };
  }

  try {
    await db
      .update(bookings)
      .set({
        status: "cancelled",
        cancelReason: "Ügyfél lemondta",
        updatedAt: new Date(),
      })
      .where(eq(bookings.id, bookingId));

    revalidatePath("/dashboard/bookings");
    revalidatePath("/admin/bookings");

    return { success: true };
  } catch {
    return { error: "Hiba történt a lemondás során" };
  }
}

export async function updateBookingStatus(
  bookingId: string,
  status: "confirmed" | "cancelled" | "completed" | "noshow"
) {
  const session = await auth();
  if (!session?.user?.role || session.user.role !== "trainer") {
    return { error: "Nincs jogosultságod" };
  }

  try {
    await db
      .update(bookings)
      .set({
        status,
        updatedAt: new Date(),
      })
      .where(eq(bookings.id, bookingId));

    revalidatePath("/admin/bookings");
    return { success: true };
  } catch {
    return { error: "Hiba történt a státusz módosítás során" };
  }
}

export async function getAvailableSlots() {
  try {
    const slots = await db
      .select()
      .from(availabilitySlots)
      .where(eq(availabilitySlots.isActive, true));

    return { slots };
  } catch {
    return { slots: [] };
  }
}

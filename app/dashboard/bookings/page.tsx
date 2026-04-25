import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { bookings, availabilitySlots, users } from "@/lib/db/schema";
import { eq, and, gte, desc } from "drizzle-orm";
import { BookingsClient } from "./bookings-client";

export default async function BookingsPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const today = new Date().toISOString().split("T")[0];

  // Elérhető időpontok lekérése
  const slots = await db
    .select()
    .from(availabilitySlots)
    .where(eq(availabilitySlots.isActive, true))
    .orderBy(availabilitySlots.dayOfWeek, availabilitySlots.startTime);

  // Saját foglalások
  const myBookings = await db
    .select({
      id: bookings.id,
      date: bookings.date,
      status: bookings.status,
      notes: bookings.notes,
      createdAt: bookings.createdAt,
      slotId: bookings.slotId,
      slotStartTime: availabilitySlots.startTime,
      slotEndTime: availabilitySlots.endTime,
      sessionType: availabilitySlots.sessionType,
    })
    .from(bookings)
    .leftJoin(availabilitySlots, eq(bookings.slotId, availabilitySlots.id))
    .where(eq(bookings.clientId, userId))
    .orderBy(desc(bookings.date))
    .limit(20);

  // Már foglalt slotok (bárki által) az elkövetkező hetekre
  const bookedSlots = await db
    .select({
      slotId: bookings.slotId,
      date: bookings.date,
    })
    .from(bookings)
    .where(
      and(
        eq(bookings.status, "confirmed"),
        gte(bookings.date, today)
      )
    );

  const serializedSlots = slots.map((s) => ({
    id: s.id,
    dayOfWeek: s.dayOfWeek ?? 0,
    startTime: s.startTime,
    endTime: s.endTime,
    sessionType: s.sessionType,
    maxCapacity: s.maxCapacity,
  }));

  const serializedBookings = myBookings.map((b) => ({
    id: b.id,
    date: b.date,
    status: b.status,
    slotStartTime: b.slotStartTime || "",
    slotEndTime: b.slotEndTime || "",
    sessionType: b.sessionType || "personal",
  }));

  const serializedBookedSlots = bookedSlots.map((b) => ({
    slotId: b.slotId,
    date: b.date,
  }));

  return (
    <BookingsClient
      availableSlots={serializedSlots}
      myBookings={serializedBookings}
      bookedSlots={serializedBookedSlots}
    />
  );
}

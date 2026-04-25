import { db } from "@/lib/db";
import { bookings, availabilitySlots, users } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { BookingsClient } from "./bookings-client";

export default async function BookingsPage() {
  const allBookings = await db
    .select({
      id: bookings.id,
      date: bookings.date,
      status: bookings.status,
      notes: bookings.notes,
      clientName: users.name,
      startTime: availabilitySlots.startTime,
      endTime: availabilitySlots.endTime,
      sessionType: availabilitySlots.sessionType,
    })
    .from(bookings)
    .innerJoin(users, eq(bookings.clientId, users.id))
    .innerJoin(availabilitySlots, eq(bookings.slotId, availabilitySlots.id))
    .orderBy(desc(bookings.date), desc(availabilitySlots.startTime));

  const serialized = allBookings.map((b) => ({
    id: b.id,
    date: b.date,
    time: `${b.startTime?.slice(0, 5)} - ${b.endTime?.slice(0, 5)}`,
    client: b.clientName || "Ismeretlen",
    type: b.sessionType,
    status: b.status as "confirmed" | "cancelled" | "completed" | "noshow",
  }));

  return <BookingsClient bookings={serialized} />;
}

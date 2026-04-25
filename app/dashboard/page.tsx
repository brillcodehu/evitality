import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { bookings, availabilitySlots, measurements, users } from "@/lib/db/schema";
import { eq, and, gte, lte, desc } from "drizzle-orm";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  const userName = session?.user?.name || "Felhasználó";

  if (!userId) return null;

  const now = new Date();
  const today = now.toISOString().split("T")[0];

  // Get upcoming bookings for this client
  const upcomingBookings = await db
    .select({
      id: bookings.id,
      date: bookings.date,
      status: bookings.status,
      slotStartTime: availabilitySlots.startTime,
      slotEndTime: availabilitySlots.endTime,
      sessionType: availabilitySlots.sessionType,
    })
    .from(bookings)
    .leftJoin(availabilitySlots, eq(bookings.slotId, availabilitySlots.id))
    .where(
      and(
        eq(bookings.clientId, userId),
        eq(bookings.status, "confirmed"),
        gte(bookings.date, today)
      )
    )
    .orderBy(bookings.date)
    .limit(10);

  // Get recent measurements for weight chart
  const recentMeasurements = await db
    .select({
      date: measurements.date,
      weight: measurements.weight,
    })
    .from(measurements)
    .where(eq(measurements.clientId, userId))
    .orderBy(desc(measurements.date))
    .limit(8);

  const weightData = recentMeasurements
    .reverse()
    .filter((m) => m.weight !== null)
    .map((m) => ({
      date: m.date,
      weight: m.weight!,
    }));

  // Find next session
  const nextSession = upcomingBookings[0] || null;

  // This week's bookings for the mini calendar
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const weekBookings = upcomingBookings.filter((b) => {
    const d = new Date(b.date);
    return d >= startOfWeek && d <= endOfWeek;
  });

  const dayNames = ["H", "K", "Sz", "Cs", "P", "Szo", "V"];
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    const booking = weekBookings.find((b) => b.date === dateStr);
    return {
      day: dayNames[i],
      date: `${(d.getMonth() + 1).toString().padStart(2, "0")}.${d.getDate().toString().padStart(2, "0")}`,
      hasSession: !!booking,
      time: booking?.slotStartTime || null,
    };
  });

  const sessionTypeLabels: Record<string, string> = {
    personal: "Személyi edzés",
    group: "Csoportos edzés",
    online: "Online konzultáció",
  };

  return (
    <DashboardClient
      userName={userName}
      nextSession={
        nextSession
          ? {
              date: nextSession.date,
              time: nextSession.slotStartTime || "",
              type: sessionTypeLabels[nextSession.sessionType || "personal"] || "Edzés",
            }
          : null
      }
      weekDays={weekDays}
      weightData={weightData}
      upcomingCount={upcomingBookings.length}
    />
  );
}

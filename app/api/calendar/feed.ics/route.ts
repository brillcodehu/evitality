import { NextRequest, NextResponse } from "next/server";
import { generateICS, bookingToEvent } from "@/lib/calendar/ics-generator";

// Mock data for development - in production this queries the database
const mockBookings = [
  {
    id: "1",
    date: "2026-04-24",
    startTime: "08:00",
    endTime: "09:00",
    sessionType: "personal",
    status: "confirmed",
    clientName: "Kovács Anna",
    trainerName: "Kiss Trainer",
  },
  {
    id: "2",
    date: "2026-04-24",
    startTime: "09:30",
    endTime: "10:30",
    sessionType: "personal",
    status: "confirmed",
    clientName: "Tóth Péter",
    trainerName: "Kiss Trainer",
  },
  {
    id: "3",
    date: "2026-04-25",
    startTime: "08:00",
    endTime: "09:00",
    sessionType: "personal",
    status: "confirmed",
    clientName: "Kiss Gábor",
    trainerName: "Kiss Trainer",
  },
  {
    id: "4",
    date: "2026-04-25",
    startTime: "17:00",
    endTime: "18:00",
    sessionType: "group",
    status: "confirmed",
    trainerName: "Kiss Trainer",
  },
  {
    id: "5",
    date: "2026-04-28",
    startTime: "10:00",
    endTime: "11:00",
    sessionType: "online",
    status: "confirmed",
    clientName: "Szabó Eszter",
    trainerName: "Kiss Trainer",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  // In production: validate token, fetch user, query their bookings
  // For now we return mock data
  if (!token) {
    return NextResponse.json(
      { error: "Token szükséges" },
      { status: 401 }
    );
  }

  const events = mockBookings.map(bookingToEvent);
  const icsContent = generateICS(events);

  return new NextResponse(icsContent, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="evitality.ics"',
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

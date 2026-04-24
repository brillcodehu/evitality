type CalendarEvent = {
  uid: string;
  summary: string;
  description?: string;
  location?: string;
  startDate: Date;
  endDate: Date;
  status: "CONFIRMED" | "CANCELLED" | "TENTATIVE";
};

function formatDate(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

function escapeText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

export function generateICS(
  events: CalendarEvent[],
  calendarName: string = "eVitality Edzések"
): string {
  const lines: string[] = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//eVitality//Personal Training Platform//HU",
    `X-WR-CALNAME:${escapeText(calendarName)}`,
    "X-WR-TIMEZONE:Europe/Budapest",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ];

  for (const event of events) {
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${event.uid}@evitality.hu`);
    lines.push(`DTSTART:${formatDate(event.startDate)}`);
    lines.push(`DTEND:${formatDate(event.endDate)}`);
    lines.push(`SUMMARY:${escapeText(event.summary)}`);

    if (event.description) {
      lines.push(`DESCRIPTION:${escapeText(event.description)}`);
    }

    if (event.location) {
      lines.push(`LOCATION:${escapeText(event.location)}`);
    }

    lines.push(`STATUS:${event.status}`);
    lines.push(`DTSTAMP:${formatDate(new Date())}`);

    // 1 hour reminder
    lines.push("BEGIN:VALARM");
    lines.push("TRIGGER:-PT1H");
    lines.push("ACTION:DISPLAY");
    lines.push(`DESCRIPTION:${escapeText(event.summary)} - 1 óra múlva`);
    lines.push("END:VALARM");

    lines.push("END:VEVENT");
  }

  lines.push("END:VCALENDAR");

  return lines.join("\r\n");
}

export function bookingToEvent(booking: {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  sessionType: string;
  status: string;
  clientName?: string;
  trainerName?: string;
}): CalendarEvent {
  const [year, month, day] = booking.date.split("-").map(Number);
  const [startHour, startMin] = booking.startTime.split(":").map(Number);
  const [endHour, endMin] = booking.endTime.split(":").map(Number);

  const startDate = new Date(year, month - 1, day, startHour, startMin);
  const endDate = new Date(year, month - 1, day, endHour, endMin);

  const typeLabels: Record<string, string> = {
    personal: "Személyi edzés",
    group: "Csoportos edzés",
    online: "Online konzultáció",
  };

  const summary = `${typeLabels[booking.sessionType] || booking.sessionType}${
    booking.trainerName ? ` - ${booking.trainerName}` : ""
  }`;

  const description = booking.clientName
    ? `Ügyfél: ${booking.clientName}`
    : undefined;

  return {
    uid: `booking-${booking.id}`,
    summary,
    description,
    startDate,
    endDate,
    status:
      booking.status === "confirmed"
        ? "CONFIRMED"
        : booking.status === "cancelled"
        ? "CANCELLED"
        : "CONFIRMED",
  };
}

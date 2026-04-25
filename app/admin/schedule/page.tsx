import { getSlots } from "@/lib/actions/schedule-actions";
import { ScheduleClient } from "./schedule-client";

export default async function SchedulePage() {
  const { slots } = await getSlots();

  const serialized = slots.map((s) => ({
    id: s.id,
    dayIndex: s.dayOfWeek ?? 0,
    startTime: s.startTime?.slice(0, 5) ?? "00:00",
    endTime: s.endTime?.slice(0, 5) ?? "00:00",
    sessionType: s.sessionType as "personal" | "group" | "online",
    maxCapacity: s.maxCapacity,
    isActive: s.isActive,
  }));

  return <ScheduleClient initialSlots={serialized} />;
}

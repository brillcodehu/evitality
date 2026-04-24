"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, CalendarPlus, X, Clock } from "lucide-react";

interface TimeSlot {
  time: string;
  type: "available" | "booked" | "unavailable";
  sessionType?: string;
}

interface Booking {
  id: string;
  date: string;
  time: string;
  sessionType: string;
  trainer: string;
  status: "upcoming" | "past";
}

const generateWeekSlots = (weekOffset: number): Record<string, TimeSlot[]> => {
  const days = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"];
  const sessionTypes = ["Erőnléti edzés", "Felsőtest", "Alsótest", "Cardio", "Core edzés", "Nyújtás"];
  const slots: Record<string, TimeSlot[]> = {};

  days.forEach((day, dayIndex) => {
    const daySlots: TimeSlot[] = [];
    for (let hour = 7; hour <= 20; hour++) {
      const time = `${hour.toString().padStart(2, "0")}:00`;
      let type: "available" | "booked" | "unavailable" = "unavailable";
      let sessionType: string | undefined;

      if (weekOffset === 0) {
        if (dayIndex === 0 && hour === 9) {
          type = "booked";
          sessionType = "Erőnléti edzés";
        } else if (dayIndex === 2 && hour === 10) {
          type = "booked";
          sessionType = "Felsőtest";
        } else if (dayIndex === 4 && hour === 8) {
          type = "booked";
          sessionType = "Alsótest";
        } else if ([8, 9, 10, 11, 14, 15, 16, 17, 18].includes(hour) && dayIndex < 6) {
          type = "available";
          sessionType = sessionTypes[Math.floor(Math.random() * sessionTypes.length)];
        }
      } else if (weekOffset > 0) {
        if ([8, 9, 10, 11, 14, 15, 16, 17, 18].includes(hour) && dayIndex < 6) {
          type = "available";
          sessionType = sessionTypes[Math.floor(Math.random() * sessionTypes.length)];
        }
      }

      daySlots.push({ time, type, sessionType });
    }
    slots[day] = daySlots;
  });

  return slots;
};

const mockBookings: Booking[] = [
  {
    id: "1",
    date: "2026. április 21. (hétfő)",
    time: "09:00",
    sessionType: "Erőnléti edzés",
    trainer: "Kovács Péter",
    status: "upcoming",
  },
  {
    id: "2",
    date: "2026. április 23. (szerda)",
    time: "10:00",
    sessionType: "Felsőtest",
    trainer: "Kovács Péter",
    status: "upcoming",
  },
  {
    id: "3",
    date: "2026. április 25. (péntek)",
    time: "08:00",
    sessionType: "Alsótest",
    trainer: "Kovács Péter",
    status: "upcoming",
  },
  {
    id: "4",
    date: "2026. április 16. (szerda)",
    time: "10:00",
    sessionType: "Cardio",
    trainer: "Kovács Péter",
    status: "past",
  },
  {
    id: "5",
    date: "2026. április 14. (hétfő)",
    time: "09:00",
    sessionType: "Erőnléti edzés",
    trainer: "Kovács Péter",
    status: "past",
  },
];

const days = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"];
const daysShort = ["H", "K", "Sz", "Cs", "P", "Szo", "V"];

export default function BookingsPage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<{
    day: string;
    time: string;
    sessionType: string;
  } | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const weekSlots = useMemo(() => generateWeekSlots(weekOffset), [weekOffset]);

  const getWeekLabel = () => {
    if (weekOffset === 0) return "Aktuális hét (ápr. 21 - ápr. 27)";
    if (weekOffset === 1) return "Következő hét (ápr. 28 - máj. 4)";
    return `${weekOffset} hét múlva`;
  };

  const handleSlotClick = (day: string, slot: TimeSlot) => {
    if (slot.type === "available") {
      setSelectedSlot({ day, time: slot.time, sessionType: slot.sessionType || "" });
      setDialogOpen(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-6xl space-y-6"
    >
      <div>
        <h1 className="font-heading text-2xl font-bold lg:text-3xl">
          Időpontfoglalás
        </h1>
        <p className="mt-1 text-muted-foreground">
          Válassz egy szabad időpontot az edzésedhez
        </p>
      </div>

      {/* Week Navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
              disabled={weekOffset === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-base">{getWeekLabel()}</CardTitle>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setWeekOffset((w) => w + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="min-w-[700px]">
            {/* Day headers */}
            <div className="grid grid-cols-[60px_repeat(7,1fr)] gap-1 mb-2">
              <div />
              {days.map((day, i) => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold text-muted-foreground"
                >
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{daysShort[i]}</span>
                </div>
              ))}
            </div>

            {/* Time slots grid */}
            <div className="space-y-1">
              {Array.from({ length: 14 }, (_, i) => i + 7).map((hour) => {
                const time = `${hour.toString().padStart(2, "0")}:00`;
                return (
                  <div
                    key={hour}
                    className="grid grid-cols-[60px_repeat(7,1fr)] gap-1"
                  >
                    <div className="flex items-center justify-end pr-2 text-xs text-muted-foreground">
                      {time}
                    </div>
                    {days.map((day) => {
                      const slot = weekSlots[day]?.find((s) => s.time === time);
                      if (!slot) return <div key={day} className="h-10" />;

                      return (
                        <button
                          key={day}
                          onClick={() => handleSlotClick(day, slot)}
                          disabled={slot.type === "unavailable"}
                          className={`h-10 rounded-md border text-[10px] font-medium transition-all ${
                            slot.type === "booked"
                              ? "border-lime bg-lime text-foreground cursor-default"
                              : slot.type === "available"
                              ? "border-lime/50 bg-lime/10 text-foreground hover:bg-lime/30 hover:border-lime cursor-pointer"
                              : "border-transparent bg-muted/30 text-muted-foreground/40 cursor-default"
                          }`}
                        >
                          {slot.type !== "unavailable" && (
                            <span className="truncate px-1">
                              {slot.type === "booked" ? "Foglalt" : "Szabad"}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-lime" />
              <span>Foglalt (saját)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded border border-lime/50 bg-lime/10" />
              <span>Szabad</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded bg-muted/30" />
              <span>Nem elérhető</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Foglalásaim</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Közelgő foglalások
          </h3>
          {mockBookings
            .filter((b) => b.status === "upcoming")
            .map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime/20">
                    <Clock className="h-5 w-5 text-lime-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{booking.date}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.time} - {booking.sessionType} - {booking.trainer}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <X className="mr-1 h-3 w-3" />
                  Lemondás
                </Button>
              </div>
            ))}

          <h3 className="mt-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Korábbi foglalások
          </h3>
          {mockBookings
            .filter((b) => b.status === "past")
            .map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between rounded-lg border border-muted/50 p-3 opacity-60"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{booking.date}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.time} - {booking.sessionType} - {booking.trainer}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Teljesítve</Badge>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Időpont foglalása</DialogTitle>
          </DialogHeader>
          {selectedSlot && (
            <div className="space-y-4 py-2">
              <div className="rounded-lg bg-lime/10 p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Nap:</span>
                  <span className="font-semibold">{selectedSlot.day}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Időpont:</span>
                  <span className="font-semibold">{selectedSlot.time}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Típus:</span>
                  <span className="font-semibold">{selectedSlot.sessionType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Edző:</span>
                  <span className="font-semibold">Kovács Péter</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                A foglalás visszaigazolást kap e-mailben. Lemondás legkésőbb 24
                órával az edzés előtt lehetséges.
              </p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Mégsem
            </Button>
            <Button
              className="bg-lime text-foreground hover:bg-lime-dark"
              onClick={() => setDialogOpen(false)}
            >
              <CalendarPlus className="mr-2 h-4 w-4" />
              Foglalás megerősítése
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

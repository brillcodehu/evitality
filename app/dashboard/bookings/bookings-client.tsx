"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, CalendarPlus, Clock, X } from "lucide-react";
import { toast } from "sonner";
import { createBooking, cancelBooking } from "@/lib/actions/booking-actions";

type AvailableSlot = {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  sessionType: string;
  maxCapacity: number;
};

type MyBooking = {
  id: string;
  date: string;
  status: string;
  slotStartTime: string;
  slotEndTime: string;
  sessionType: string;
};

type BookedSlot = {
  slotId: string;
  date: string;
};

type Props = {
  availableSlots: AvailableSlot[];
  myBookings: MyBooking[];
  bookedSlots: BookedSlot[];
};

const dayNames = ["Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"];
const sessionTypeLabels: Record<string, string> = {
  personal: "Személyi edzés",
  group: "Csoportos edzés",
  online: "Online konzultáció",
};
const sessionTypeColors: Record<string, string> = {
  personal: "bg-lime/20 text-lime-dark border-lime/30",
  group: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  online: "bg-purple-500/10 text-purple-600 border-purple-500/20",
};

export function BookingsClient({ availableSlots, myBookings, bookedSlots }: Props) {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<{
    slot: AvailableSlot;
    date: string;
    dateFormatted: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1 + weekOffset * 7);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  function isSlotBooked(slotId: string, dateStr: string): boolean {
    return bookedSlots.some((b) => b.slotId === slotId && b.date === dateStr);
  }

  function isMyBooking(slotId: string, dateStr: string): boolean {
    return myBookings.some(
      (b) => b.date === dateStr && b.status === "confirmed"
    );
  }

  async function handleBook() {
    if (!selectedSlot) return;
    setLoading(true);

    const formData = new FormData();
    formData.set("slotId", selectedSlot.slot.id);
    formData.set("date", selectedSlot.date);

    const result = await createBooking(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Időpont sikeresen lefoglalva!");
      window.location.reload();
    }
    setLoading(false);
    setSelectedSlot(null);
  }

  async function handleCancel(bookingId: string) {
    const result = await cancelBooking(bookingId);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Foglalás lemondva!");
      window.location.reload();
    }
  }

  const today = new Date().toISOString().split("T")[0];
  const upcomingBookings = myBookings.filter((b) => b.date >= today && b.status === "confirmed");
  const pastBookings = myBookings.filter((b) => b.date < today || b.status !== "confirmed");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
          Időpontfoglalás
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Válaszd ki a számodra megfelelő időpontot
        </p>
      </div>

      {/* Heti nézet */}
      <Card className="border-zinc-200">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg">Elérhető időpontok</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setWeekOffset((w) => w - 1)}
              disabled={weekOffset <= 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[140px] text-center">
              {weekDates[0].toLocaleDateString("hu-HU", { month: "short", day: "numeric" })}
              {" - "}
              {weekDates[6].toLocaleDateString("hu-HU", { month: "short", day: "numeric" })}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setWeekOffset((w) => w + 1)}
              disabled={weekOffset >= 3}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {availableSlots.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">
              <CalendarPlus className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>Jelenleg nincs elérhető időpont.</p>
              <p className="text-sm mt-1">Az edző hamarosan beállítja az órarendet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-2">
              {weekDates.map((date, dayIdx) => {
                const dateStr = date.toISOString().split("T")[0];
                const dayOfWeek = dayIdx; // 0=Mon for our purposes
                const isPast = dateStr < today;
                const daySlots = availableSlots.filter((s) => s.dayOfWeek === dayOfWeek);

                return (
                  <div key={dateStr} className="space-y-1.5">
                    <div className={`text-center py-1.5 rounded-t-lg text-xs font-semibold ${
                      dateStr === today ? "bg-lime/20 text-lime-dark" : "bg-zinc-50 text-zinc-600"
                    }`}>
                      <p>{dayNames[dayIdx]}</p>
                      <p className="text-[10px]">{date.getMonth() + 1}.{date.getDate().toString().padStart(2, "0")}</p>
                    </div>
                    {daySlots.length > 0 ? (
                      daySlots.map((slot) => {
                        const booked = isSlotBooked(slot.id, dateStr);
                        const disabled = isPast || booked;

                        return (
                          <button
                            key={slot.id}
                            disabled={disabled}
                            onClick={() =>
                              setSelectedSlot({
                                slot,
                                date: dateStr,
                                dateFormatted: date.toLocaleDateString("hu-HU", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }),
                              })
                            }
                            className={`w-full rounded-md border p-1.5 text-xs transition-colors ${
                              disabled
                                ? "border-zinc-100 bg-zinc-50 text-zinc-300 cursor-not-allowed"
                                : "border-lime/30 bg-lime/5 text-zinc-700 hover:bg-lime/20 hover:border-lime/50 cursor-pointer"
                            }`}
                          >
                            <p className="font-medium">{slot.startTime}</p>
                            <p className="text-[10px] text-zinc-400">
                              {sessionTypeLabels[slot.sessionType]?.split(" ")[0] || "Edzés"}
                            </p>
                          </button>
                        );
                      })
                    ) : (
                      <p className="text-[10px] text-zinc-300 text-center py-3">-</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Foglalás megerősítő dialog */}
      <Dialog open={!!selectedSlot} onOpenChange={() => setSelectedSlot(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Időpont foglalása</DialogTitle>
          </DialogHeader>
          {selectedSlot && (
            <div className="space-y-4 pt-2">
              <div className="rounded-lg bg-zinc-50 p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-lime" />
                  <span className="font-medium">{selectedSlot.dateFormatted}</span>
                </div>
                <p className="text-lg font-bold">
                  {selectedSlot.slot.startTime} - {selectedSlot.slot.endTime}
                </p>
                <Badge variant="outline" className={sessionTypeColors[selectedSlot.slot.sessionType] || ""}>
                  {sessionTypeLabels[selectedSlot.slot.sessionType] || selectedSlot.slot.sessionType}
                </Badge>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedSlot(null)}
                >
                  Mégsem
                </Button>
                <Button
                  className="flex-1 bg-lime text-zinc-900 hover:bg-lime-dark font-semibold"
                  disabled={loading}
                  onClick={handleBook}
                >
                  {loading ? "Foglalás..." : "Lefoglalom"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Foglalásaim */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900">Foglalásaim</h2>

        {upcomingBookings.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-500">Közelgő</p>
            {upcomingBookings.map((b) => (
              <Card key={b.id} className="border-zinc-200">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-lime/10 flex items-center justify-center">
                      <CalendarPlus className="h-5 w-5 text-lime" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {new Date(b.date).toLocaleDateString("hu-HU", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {b.slotStartTime} - {b.slotEndTime} | {sessionTypeLabels[b.sessionType] || b.sessionType}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-200 hover:bg-red-50"
                    onClick={() => handleCancel(b.id)}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Lemondás
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {upcomingBookings.length === 0 && (
          <Card className="border-dashed border-2 border-zinc-200">
            <CardContent className="flex flex-col items-center gap-2 py-8 text-center">
              <CalendarPlus className="h-10 w-10 text-zinc-300" />
              <p className="text-sm text-zinc-500">Nincs közelgő foglalásod.</p>
            </CardContent>
          </Card>
        )}

        {pastBookings.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-zinc-500 mt-6">Korábbi</p>
            {pastBookings.slice(0, 5).map((b) => (
              <Card key={b.id} className="border-zinc-100 bg-zinc-50/50">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-500">
                        {new Date(b.date).toLocaleDateString("hu-HU", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-xs text-zinc-400">
                        {b.slotStartTime} - {b.slotEndTime}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={
                    b.status === "completed" ? "bg-zinc-100 text-zinc-500" :
                    b.status === "cancelled" ? "bg-red-50 text-red-500" :
                    "bg-zinc-100 text-zinc-500"
                  }>
                    {b.status === "completed" ? "Teljesítve" :
                     b.status === "cancelled" ? "Lemondva" :
                     b.status === "noshow" ? "Nem jelent meg" : b.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

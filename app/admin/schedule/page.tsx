"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Clock, Users, Trash2 } from "lucide-react";
import { toast } from "sonner";

const days = [
  "Hétfő",
  "Kedd",
  "Szerda",
  "Csütörtök",
  "Péntek",
  "Szombat",
  "Vasárnap",
];

const hours = Array.from({ length: 16 }, (_, i) => `${(i + 6).toString().padStart(2, "0")}:00`);

type Slot = {
  id: string;
  dayIndex: number;
  startTime: string;
  endTime: string;
  sessionType: "personal" | "group" | "online";
  maxCapacity: number;
  isActive: boolean;
};

const initialSlots: Slot[] = [
  { id: "1", dayIndex: 0, startTime: "08:00", endTime: "09:00", sessionType: "personal", maxCapacity: 1, isActive: true },
  { id: "2", dayIndex: 0, startTime: "09:30", endTime: "10:30", sessionType: "personal", maxCapacity: 1, isActive: true },
  { id: "3", dayIndex: 0, startTime: "17:00", endTime: "18:00", sessionType: "group", maxCapacity: 6, isActive: true },
  { id: "4", dayIndex: 1, startTime: "07:00", endTime: "08:00", sessionType: "personal", maxCapacity: 1, isActive: true },
  { id: "5", dayIndex: 1, startTime: "10:00", endTime: "11:00", sessionType: "online", maxCapacity: 1, isActive: true },
  { id: "6", dayIndex: 1, startTime: "16:00", endTime: "17:30", sessionType: "group", maxCapacity: 8, isActive: true },
  { id: "7", dayIndex: 2, startTime: "08:00", endTime: "09:00", sessionType: "personal", maxCapacity: 1, isActive: true },
  { id: "8", dayIndex: 2, startTime: "09:30", endTime: "10:30", sessionType: "personal", maxCapacity: 1, isActive: true },
  { id: "9", dayIndex: 3, startTime: "07:00", endTime: "08:00", sessionType: "personal", maxCapacity: 1, isActive: true },
  { id: "10", dayIndex: 3, startTime: "11:00", endTime: "12:00", sessionType: "online", maxCapacity: 1, isActive: true },
  { id: "11", dayIndex: 4, startTime: "08:00", endTime: "09:00", sessionType: "personal", maxCapacity: 1, isActive: true },
  { id: "12", dayIndex: 4, startTime: "17:00", endTime: "18:30", sessionType: "group", maxCapacity: 6, isActive: true },
  { id: "13", dayIndex: 5, startTime: "09:00", endTime: "10:00", sessionType: "group", maxCapacity: 8, isActive: true },
  { id: "14", dayIndex: 5, startTime: "10:30", endTime: "11:30", sessionType: "personal", maxCapacity: 1, isActive: true },
];

const typeLabels: Record<string, { label: string; color: string }> = {
  personal: { label: "Személyi", color: "bg-lime/20 text-lime-dark border-lime/30" },
  group: { label: "Csoportos", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  online: { label: "Online", color: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
};

export default function SchedulePage() {
  const [slots, setSlots] = useState<Slot[]>(initialSlots);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newSlot, setNewSlot] = useState({
    dayIndex: 0,
    startTime: "08:00",
    endTime: "09:00",
    sessionType: "personal" as "personal" | "group" | "online",
    maxCapacity: 1,
  });

  function handleAddSlot() {
    const slot: Slot = {
      id: Date.now().toString(),
      ...newSlot,
      isActive: true,
    };
    setSlots((prev) => [...prev, slot]);
    setDialogOpen(false);
    toast.success("Időpont hozzáadva!");
  }

  function handleDeleteSlot(id: string) {
    setSlots((prev) => prev.filter((s) => s.id !== id));
    toast.success("Időpont törölve!");
  }

  function handleToggleSlot(id: string) {
    setSlots((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  }

  function getSlotsForDay(dayIndex: number) {
    return slots
      .filter((s) => s.dayIndex === dayIndex)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
            Órarend kezelés
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Állítsd be az elérhető időpontjaidat az egyes napokra
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none bg-lime text-zinc-900 hover:bg-lime-dark font-semibold h-10 px-4 py-2">
              <Plus className="h-4 w-4 mr-2" />
              Új időpont
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Új elérhető időpont</DialogTitle>
              <DialogDescription>
                Add meg az időpont részleteit, amit az ügyfeleid foglalhatnak
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Nap</Label>
                <Select
                  value={newSlot.dayIndex.toString()}
                  onValueChange={(v) =>
                    setNewSlot((p) => ({ ...p, dayIndex: parseInt(v ?? "0") }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day, i) => (
                      <SelectItem key={i} value={i.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Kezdés</Label>
                  <Input
                    type="time"
                    value={newSlot.startTime}
                    onChange={(e) =>
                      setNewSlot((p) => ({ ...p, startTime: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Befejezés</Label>
                  <Input
                    type="time"
                    value={newSlot.endTime}
                    onChange={(e) =>
                      setNewSlot((p) => ({ ...p, endTime: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Edzés típus</Label>
                <Select
                  value={newSlot.sessionType}
                  onValueChange={(v) => {
                    if (!v) return;
                    setNewSlot((p) => ({
                      ...p,
                      sessionType: v as "personal" | "group" | "online",
                      maxCapacity: v === "personal" || v === "online" ? 1 : 6,
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Személyi edzés</SelectItem>
                    <SelectItem value="group">Csoportos edzés</SelectItem>
                    <SelectItem value="online">Online konzultáció</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newSlot.sessionType === "group" && (
                <div className="space-y-2">
                  <Label>Max. létszám</Label>
                  <Input
                    type="number"
                    min={2}
                    max={20}
                    value={newSlot.maxCapacity}
                    onChange={(e) =>
                      setNewSlot((p) => ({
                        ...p,
                        maxCapacity: parseInt(e.target.value) || 6,
                      }))
                    }
                  />
                </div>
              )}
              <Button
                onClick={handleAddSlot}
                className="w-full bg-lime text-zinc-900 hover:bg-lime-dark font-semibold"
              >
                Hozzáadás
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Weekly Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {days.map((day, dayIndex) => {
          const daySlots = getSlotsForDay(dayIndex);
          return (
            <Card key={day} className="border-zinc-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold text-zinc-900">
                  {day}
                </CardTitle>
                <CardDescription className="text-xs">
                  {daySlots.filter((s) => s.isActive).length} aktív időpont
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {daySlots.length === 0 ? (
                  <p className="text-sm text-zinc-400 italic py-4 text-center">
                    Nincs beállított időpont
                  </p>
                ) : (
                  daySlots.map((slot) => {
                    const typeInfo = typeLabels[slot.sessionType];
                    return (
                      <div
                        key={slot.id}
                        className={`flex items-center justify-between rounded-lg border p-3 transition-opacity ${
                          slot.isActive ? "bg-white" : "bg-zinc-50 opacity-50"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="text-sm">
                            <div className="flex items-center gap-1.5 font-medium text-zinc-900">
                              <Clock className="h-3.5 w-3.5 text-zinc-400" />
                              {slot.startTime} - {slot.endTime}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant="outline"
                                className={`text-xs ${typeInfo.color}`}
                              >
                                {typeInfo.label}
                              </Badge>
                              {slot.sessionType === "group" && (
                                <span className="flex items-center gap-0.5 text-xs text-zinc-500">
                                  <Users className="h-3 w-3" />
                                  max. {slot.maxCapacity}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={slot.isActive}
                            onCheckedChange={() => handleToggleSlot(slot.id)}
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-red-500"
                            onClick={() => handleDeleteSlot(slot.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

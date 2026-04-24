"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CalendarCheck,
  CalendarX,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";

type Booking = {
  id: string;
  date: string;
  time: string;
  client: string;
  type: string;
  status: "confirmed" | "cancelled" | "completed" | "noshow";
};

const allBookings: Booking[] = [
  { id: "1", date: "2026-04-24", time: "08:00 - 09:00", client: "Kovács Anna", type: "Személyi edzés", status: "confirmed" },
  { id: "2", date: "2026-04-24", time: "09:30 - 10:30", client: "Tóth Péter", type: "Személyi edzés", status: "confirmed" },
  { id: "3", date: "2026-04-24", time: "11:00 - 12:00", client: "Csoportos edzés (5 fő)", type: "Csoportos", status: "confirmed" },
  { id: "4", date: "2026-04-24", time: "17:00 - 18:00", client: "Szabó Eszter", type: "Online konzultáció", status: "confirmed" },
  { id: "5", date: "2026-04-25", time: "08:00 - 09:00", client: "Kiss Gábor", type: "Személyi edzés", status: "confirmed" },
  { id: "6", date: "2026-04-25", time: "10:00 - 11:00", client: "Nagy László", type: "Személyi edzés", status: "confirmed" },
  { id: "7", date: "2026-04-23", time: "08:00 - 09:00", client: "Kovács Anna", type: "Személyi edzés", status: "completed" },
  { id: "8", date: "2026-04-23", time: "09:30 - 10:30", client: "Varga Júlia", type: "Online konzultáció", status: "cancelled" },
  { id: "9", date: "2026-04-22", time: "08:00 - 09:00", client: "Horváth Dániel", type: "Személyi edzés", status: "completed" },
  { id: "10", date: "2026-04-22", time: "17:00 - 18:00", client: "Molnár Réka", type: "Személyi edzés", status: "noshow" },
  { id: "11", date: "2026-04-21", time: "09:00 - 10:00", client: "Farkas Béla", type: "Személyi edzés", status: "completed" },
  { id: "12", date: "2026-04-21", time: "16:00 - 17:00", client: "Balogh Kata", type: "Online konzultáció", status: "cancelled" },
];

const statusConfig: Record<string, { label: string; className: string; icon: React.ElementType }> = {
  confirmed: { label: "Megerősítve", className: "bg-lime/20 text-lime-dark border-lime/30", icon: CalendarCheck },
  cancelled: { label: "Lemondva", className: "bg-red-500/10 text-red-600 border-red-500/20", icon: CalendarX },
  completed: { label: "Teljesítve", className: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20", icon: CheckCircle2 },
  noshow: { label: "Nem jelent meg", className: "bg-orange-500/10 text-orange-600 border-orange-500/20", icon: AlertTriangle },
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(allBookings);

  const today = "2026-04-24";
  const todayBookings = bookings.filter((b) => b.date === today);
  const weekBookings = bookings.filter((b) => b.date >= "2026-04-21" && b.date <= "2026-04-27");
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled");

  function updateStatus(id: string, status: Booking["status"]) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    const labels = { completed: "teljesítettre", cancelled: "lemondottra", noshow: "nem jelent meg-re", confirmed: "megerősítettre" };
    toast.success(`Státusz módosítva: ${labels[status]}`);
  }

  function BookingsTable({ data }: { data: Booking[] }) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dátum</TableHead>
            <TableHead>Időpont</TableHead>
            <TableHead>Ügyfél</TableHead>
            <TableHead>Típus</TableHead>
            <TableHead>Státusz</TableHead>
            <TableHead className="text-right">Műveletek</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-zinc-400 py-8">
                Nincs foglalás ebben a kategóriában
              </TableCell>
            </TableRow>
          ) : (
            data.map((booking) => {
              const sc = statusConfig[booking.status];
              return (
                <TableRow key={booking.id}>
                  <TableCell className="text-sm font-medium">{booking.date}</TableCell>
                  <TableCell className="text-sm">{booking.time}</TableCell>
                  <TableCell className="text-sm font-medium">{booking.client}</TableCell>
                  <TableCell className="text-sm text-zinc-500">{booking.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={sc.className}>
                      {sc.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium h-8 w-8 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none">
                          <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => updateStatus(booking.id, "completed")}>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Teljesítve
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(booking.id, "cancelled")}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Lemondva
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => updateStatus(booking.id, "noshow")}>
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Nem jelent meg
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
          Foglalások
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Kezeld az ügyfeleid foglalásait és edzéseit
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Mai edzések", value: todayBookings.filter((b) => b.status === "confirmed").length, icon: CalendarCheck },
          { label: "Heti összesen", value: weekBookings.length, icon: CalendarCheck },
          { label: "Lemondva (hét)", value: weekBookings.filter((b) => b.status === "cancelled").length, icon: CalendarX },
          { label: "Nem jelent meg", value: bookings.filter((b) => b.status === "noshow").length, icon: AlertTriangle },
        ].map((stat) => (
          <Card key={stat.label} className="border-zinc-200">
            <CardContent className="pt-5">
              <div className="flex items-center justify-between">
                <p className="text-sm text-zinc-500">{stat.label}</p>
                <stat.icon className="h-4 w-4 text-zinc-400" />
              </div>
              <p className="text-2xl font-bold text-zinc-900 mt-1">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Card className="border-zinc-200">
        <CardHeader>
          <CardTitle className="text-lg">Foglalások listája</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Összes ({bookings.length})</TabsTrigger>
              <TabsTrigger value="today">Mai ({todayBookings.length})</TabsTrigger>
              <TabsTrigger value="week">Heti ({weekBookings.length})</TabsTrigger>
              <TabsTrigger value="cancelled">Lemondott ({cancelledBookings.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <BookingsTable data={bookings} />
            </TabsContent>
            <TabsContent value="today" className="mt-4">
              <BookingsTable data={todayBookings} />
            </TabsContent>
            <TabsContent value="week" className="mt-4">
              <BookingsTable data={weekBookings} />
            </TabsContent>
            <TabsContent value="cancelled" className="mt-4">
              <BookingsTable data={cancelledBookings} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, Users, TrendingUp, Calendar } from "lucide-react";
import { db } from "@/lib/db";
import { bookings, availabilitySlots, users } from "@/lib/db/schema";
import { eq, and, count, sql, desc } from "drizzle-orm";

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, { label: string; className: string }> = {
    confirmed: {
      label: "Megerősítve",
      className: "bg-lime/20 text-lime-dark border-lime/30",
    },
    cancelled: {
      label: "Lemondva",
      className: "bg-red-500/10 text-red-600 border-red-500/20",
    },
    completed: {
      label: "Teljesítve",
      className: "bg-zinc-500/10 text-zinc-600 border-zinc-500/20",
    },
    noshow: {
      label: "Nem jelent meg",
      className: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    },
  };

  const v = variants[status] || variants.confirmed;

  return (
    <Badge variant="outline" className={v.className}>
      {v.label}
    </Badge>
  );
}

const sessionTypeLabels: Record<string, string> = {
  personal: "Személyi edzés",
  group: "Csoportos edzés",
  online: "Online konzultáció",
};

export default async function AdminDashboard() {
  const today = new Date().toISOString().split("T")[0];

  // A hét elejét (hétfő) kiszámoljuk
  const now = new Date();
  const dayOfWeek = now.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  const weekStart = monday.toISOString().split("T")[0];
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const weekEnd = sunday.toISOString().split("T")[0];

  // Lekérdezések párhuzamosan
  const [
    todayConfirmedResult,
    activeClientsResult,
    weekBookingsResult,
    todaySessionsResult,
    recentBookingsResult,
  ] = await Promise.all([
    // Mai megerősített foglalások száma
    db
      .select({ count: count() })
      .from(bookings)
      .where(
        and(eq(bookings.date, today), eq(bookings.status, "confirmed"))
      ),

    // Aktív ügyfelek száma
    db
      .select({ count: count() })
      .from(users)
      .where(and(eq(users.role, "client"), eq(users.isActive, true))),

    // Heti foglalások száma
    db
      .select({ count: count() })
      .from(bookings)
      .where(
        sql`${bookings.date} >= ${weekStart} AND ${bookings.date} <= ${weekEnd}`
      ),

    // Mai edzések (foglalások + ügyfél nevek + slot adatok)
    db
      .select({
        id: bookings.id,
        date: bookings.date,
        status: bookings.status,
        clientName: users.name,
        startTime: availabilitySlots.startTime,
        endTime: availabilitySlots.endTime,
        sessionType: availabilitySlots.sessionType,
      })
      .from(bookings)
      .innerJoin(users, eq(bookings.clientId, users.id))
      .innerJoin(availabilitySlots, eq(bookings.slotId, availabilitySlots.id))
      .where(eq(bookings.date, today))
      .orderBy(availabilitySlots.startTime),

    // Utolsó 10 foglalás
    db
      .select({
        id: bookings.id,
        date: bookings.date,
        status: bookings.status,
        clientName: users.name,
        startTime: availabilitySlots.startTime,
        sessionType: availabilitySlots.sessionType,
      })
      .from(bookings)
      .innerJoin(users, eq(bookings.clientId, users.id))
      .innerJoin(availabilitySlots, eq(bookings.slotId, availabilitySlots.id))
      .orderBy(desc(bookings.date), desc(availabilitySlots.startTime))
      .limit(10),
  ]);

  const todayConfirmed = todayConfirmedResult[0]?.count ?? 0;
  const activeClients = activeClientsResult[0]?.count ?? 0;
  const weekBookings = weekBookingsResult[0]?.count ?? 0;

  const stats = [
    {
      label: "Mai edzések",
      value: todayConfirmed.toString(),
      icon: CalendarDays,
      description: `${today} - megerősített foglalások`,
    },
    {
      label: "Aktív ügyfelek",
      value: activeClients.toString(),
      icon: Users,
      description: "Regisztrált, aktív ügyfelek",
    },
    {
      label: "Heti foglalások",
      value: weekBookings.toString(),
      icon: Calendar,
      description: `${weekStart} - ${weekEnd}`,
    },
    {
      label: "Mai program",
      value: todaySessionsResult.length.toString(),
      icon: TrendingUp,
      description: "Összes mai foglalás",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
          Áttekintés
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Üdvözöllek! Itt látod a napi összefoglalót.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-zinc-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-lime" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-zinc-900">
                {stat.value}
              </div>
              <p className="mt-1 text-xs text-zinc-500">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's sessions */}
        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-zinc-900">
              Mai program
            </CardTitle>
            <CardDescription>
              Mai napra tervezett edzések és konzultációk
            </CardDescription>
          </CardHeader>
          <CardContent>
            {todaySessionsResult.length === 0 ? (
              <p className="py-8 text-center text-sm text-zinc-400">
                Nincs mai foglalás
              </p>
            ) : (
              <div className="space-y-3">
                {todaySessionsResult.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50/50 p-3"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-28 text-sm font-medium text-zinc-700">
                        {session.startTime?.slice(0, 5)} - {session.endTime?.slice(0, 5)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-900">
                          {session.clientName || "Ismeretlen"}
                        </p>
                        <p className="text-xs text-zinc-500">
                          {sessionTypeLabels[session.sessionType] || session.sessionType}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={session.status} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent bookings */}
        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-zinc-900">
              Legutóbbi foglalások
            </CardTitle>
            <CardDescription>Az elmúlt napok foglalásai</CardDescription>
          </CardHeader>
          <CardContent>
            {recentBookingsResult.length === 0 ? (
              <p className="py-8 text-center text-sm text-zinc-400">
                Nincsenek foglalások
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dátum</TableHead>
                    <TableHead>Ügyfél</TableHead>
                    <TableHead>Típus</TableHead>
                    <TableHead className="text-right">Státusz</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookingsResult.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="text-sm">
                        {booking.date} {booking.startTime?.slice(0, 5)}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {booking.clientName || "Ismeretlen"}
                      </TableCell>
                      <TableCell className="text-sm text-zinc-500">
                        {sessionTypeLabels[booking.sessionType] || booking.sessionType}
                      </TableCell>
                      <TableCell className="text-right">
                        <StatusBadge status={booking.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

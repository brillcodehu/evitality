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
import { CalendarDays, Users, Wallet, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Mai edzések",
    value: "4",
    icon: CalendarDays,
    description: "2 személyi, 1 csoportos, 1 online",
  },
  {
    label: "Aktív ügyfelek",
    value: "23",
    icon: Users,
    description: "+3 az elmúlt hónapban",
  },
  {
    label: "Heti bevétel",
    value: "185.000 Ft",
    icon: Wallet,
    description: "+12% az előző héthez képest",
  },
  {
    label: "Foglalási ráta",
    value: "92%",
    icon: TrendingUp,
    description: "Az elmúlt 30 nap átlaga",
  },
];

const todaySessions = [
  {
    time: "08:00 - 09:00",
    client: "Kovács Anna",
    type: "Személyi edzés",
    status: "confirmed",
  },
  {
    time: "09:30 - 10:30",
    client: "Tóth Péter",
    type: "Személyi edzés",
    status: "confirmed",
  },
  {
    time: "11:00 - 12:00",
    client: "Csoportos edzés",
    type: "Csoportos (6/8 fő)",
    status: "confirmed",
  },
  {
    time: "17:00 - 18:00",
    client: "Szabó Eszter",
    type: "Online konzultáció",
    status: "confirmed",
  },
];

const recentBookings = [
  {
    date: "2026-04-23",
    time: "08:00",
    client: "Kovács Anna",
    type: "Személyi edzés",
    status: "confirmed",
  },
  {
    date: "2026-04-23",
    time: "09:30",
    client: "Tóth Péter",
    type: "Személyi edzés",
    status: "confirmed",
  },
  {
    date: "2026-04-24",
    time: "10:00",
    client: "Nagy László",
    type: "Személyi edzés",
    status: "confirmed",
  },
  {
    date: "2026-04-24",
    time: "16:00",
    client: "Varga Júlia",
    type: "Online konzultáció",
    status: "cancelled",
  },
  {
    date: "2026-04-25",
    time: "08:00",
    client: "Kiss Gábor",
    type: "Személyi edzés",
    status: "confirmed",
  },
];

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
  };

  const v = variants[status] || variants.confirmed;

  return (
    <Badge variant="outline" className={v.className}>
      {v.label}
    </Badge>
  );
}

export default function AdminDashboard() {
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
            <div className="space-y-3">
              {todaySessions.map((session, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-zinc-100 bg-zinc-50/50 p-3"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-28 text-sm font-medium text-zinc-700">
                      {session.time}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-900">
                        {session.client}
                      </p>
                      <p className="text-xs text-zinc-500">{session.type}</p>
                    </div>
                  </div>
                  <StatusBadge status={session.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent bookings */}
        <Card className="border-zinc-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-zinc-900">
              Legutóbbi foglalások
            </CardTitle>
            <CardDescription>
              Az elmúlt napok foglalásai
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                {recentBookings.map((booking, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-sm">
                      {booking.date} {booking.time}
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {booking.client}
                    </TableCell>
                    <TableCell className="text-sm text-zinc-500">
                      {booking.type}
                    </TableCell>
                    <TableCell className="text-right">
                      <StatusBadge status={booking.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

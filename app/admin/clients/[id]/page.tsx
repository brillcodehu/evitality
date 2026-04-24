"use client";

import { useParams } from "next/navigation";
import { ArrowLeft, Mail, Phone, MapPin, Target, Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const clientData: Record<
  string,
  {
    name: string;
    email: string;
    phone: string;
    address: string;
    birthDate: string;
    status: string;
    package: string;
    startDate: string;
    goals: string[];
    healthConditions: string[];
    notes: string;
  }
> = {
  "1": {
    name: "Kovács Anna",
    email: "kovacs.anna@example.com",
    phone: "+36 30 123 4567",
    address: "Budapest, Váci út 12.",
    birthDate: "1992-05-14",
    status: "active",
    package: "Havi 8 alkalom",
    startDate: "2025-09-01",
    goals: ["Fogyás", "Állóképesség fejlesztés", "Stresszkezelés"],
    healthConditions: ["Enyhe térdproblémák"],
    notes:
      "Motivált, rendszeresen jár. Hétfő és szerda délelőttöket preferálja.",
  },
  "2": {
    name: "Tóth Péter",
    email: "toth.peter@example.com",
    phone: "+36 20 234 5678",
    address: "Budapest, Andrássy út 45.",
    birthDate: "1988-11-22",
    status: "active",
    package: "Havi 12 alkalom",
    startDate: "2025-06-15",
    goals: ["Izomépítés", "Erőnövelés"],
    healthConditions: [],
    notes: "Haladó szint, versenyekre készül.",
  },
};

const measurements = [
  { date: "2026-04-15", weight: 68.5, chest: 92, waist: 72, hip: 96, arm: 28, bodyFat: 22.1 },
  { date: "2026-03-15", weight: 69.8, chest: 93, waist: 74, hip: 97, arm: 27.5, bodyFat: 23.4 },
  { date: "2026-02-15", weight: 71.2, chest: 94, waist: 76, hip: 98, arm: 27, bodyFat: 24.8 },
  { date: "2026-01-15", weight: 72.5, chest: 95, waist: 78, hip: 99, arm: 26.5, bodyFat: 26.1 },
  { date: "2025-12-15", weight: 73.0, chest: 95, waist: 79, hip: 99, arm: 26, bodyFat: 26.8 },
];

const bookings = [
  { date: "2026-04-23", time: "08:00", type: "Személyi edzés", status: "confirmed" },
  { date: "2026-04-21", time: "08:00", type: "Személyi edzés", status: "completed" },
  { date: "2026-04-18", time: "09:00", type: "Személyi edzés", status: "completed" },
  { date: "2026-04-16", time: "08:00", type: "Személyi edzés", status: "completed" },
  { date: "2026-04-14", time: "08:00", type: "Személyi edzés", status: "cancelled" },
];

const trainingPlan = [
  { day: "Hétfő", focus: "Alsó test", exercises: "Guggolás, Kitörés, Lábtolás, Román húzás", sets: "4x12" },
  { day: "Szerda", focus: "Felső test", exercises: "Fekvenyomás, Húzódzkodás, Vállnyomás, Evezés", sets: "4x10" },
  { day: "Péntek", focus: "Teljes test + Kardió", exercises: "Kettlebell swing, Burpee, Box jump, Planking", sets: "3x15" },
];

export default function ClientDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const client = clientData[id] || clientData["1"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/clients" className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none">
            <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
            {client.name}
          </h1>
          <div className="mt-1 flex items-center gap-3">
            <Badge
              variant="outline"
              className={
                client.status === "active"
                  ? "bg-lime/20 text-lime-dark border-lime/30"
                  : "bg-zinc-100 text-zinc-500 border-zinc-200"
              }
            >
              {client.status === "active" ? "Aktív" : "Inaktív"}
            </Badge>
            <span className="text-sm text-zinc-500">{client.package}</span>
          </div>
        </div>
        <Button className="bg-lime text-zinc-900 hover:bg-lime-dark">
          Szerkesztés
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="training">Edzésterv</TabsTrigger>
          <TabsTrigger value="measurements">Mérések</TabsTrigger>
          <TabsTrigger value="bookings">Foglalások</TabsTrigger>
          <TabsTrigger value="documents">Dokumentumok</TabsTrigger>
        </TabsList>

        {/* Profile tab */}
        <TabsContent value="profile">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-zinc-200">
              <CardHeader>
                <CardTitle className="text-lg">Személyes adatok</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-zinc-400" />
                  <span className="text-sm text-zinc-700">{client.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-zinc-400" />
                  <span className="text-sm text-zinc-700">{client.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-zinc-400" />
                  <span className="text-sm text-zinc-700">
                    {client.address}
                  </span>
                </div>
                <div className="pt-2 text-sm text-zinc-500">
                  <span className="font-medium text-zinc-700">
                    Születési dátum:
                  </span>{" "}
                  {client.birthDate}
                </div>
                <div className="text-sm text-zinc-500">
                  <span className="font-medium text-zinc-700">
                    Tag mióta:
                  </span>{" "}
                  {client.startDate}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-zinc-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="h-5 w-5 text-lime" />
                    Fitnesz célok
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {client.goals.map((goal) => (
                      <Badge
                        key={goal}
                        variant="outline"
                        className="bg-lime/10 text-lime-dark border-lime/20"
                      >
                        {goal}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Heart className="h-5 w-5 text-red-500" />
                    Egészségügyi állapot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {client.healthConditions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {client.healthConditions.map((cond) => (
                        <Badge
                          key={cond}
                          variant="outline"
                          className="bg-orange-500/10 text-orange-600 border-orange-500/20"
                        >
                          {cond}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500">
                      Nincs ismert egészségügyi probléma.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-zinc-200">
                <CardHeader>
                  <CardTitle className="text-lg">Megjegyzések</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-600">{client.notes}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Training plan tab */}
        <TabsContent value="training">
          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg">Aktuális edzésterv</CardTitle>
              <CardDescription>
                Fogyás 12 hét program - 6. hét
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nap</TableHead>
                    <TableHead>Fókusz</TableHead>
                    <TableHead>Gyakorlatok</TableHead>
                    <TableHead>Sorozat/Ismétlés</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainingPlan.map((day) => (
                    <TableRow key={day.day}>
                      <TableCell className="font-medium">{day.day}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-lime/10 text-lime-dark border-lime/20">
                          {day.focus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-zinc-600">
                        {day.exercises}
                      </TableCell>
                      <TableCell className="text-sm text-zinc-500">
                        {day.sets}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Measurements tab */}
        <TabsContent value="measurements">
          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg">Mérési előzmények</CardTitle>
              <CardDescription>Testsúly és testméretek alakulása</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dátum</TableHead>
                    <TableHead>Súly (kg)</TableHead>
                    <TableHead>Mellkas (cm)</TableHead>
                    <TableHead>Derék (cm)</TableHead>
                    <TableHead>Csípő (cm)</TableHead>
                    <TableHead>Kar (cm)</TableHead>
                    <TableHead>Testzsír (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {measurements.map((m) => (
                    <TableRow key={m.date}>
                      <TableCell className="font-medium">{m.date}</TableCell>
                      <TableCell>{m.weight}</TableCell>
                      <TableCell>{m.chest}</TableCell>
                      <TableCell>{m.waist}</TableCell>
                      <TableCell>{m.hip}</TableCell>
                      <TableCell>{m.arm}</TableCell>
                      <TableCell>{m.bodyFat}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings tab */}
        <TabsContent value="bookings">
          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg">Foglalási előzmények</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dátum</TableHead>
                    <TableHead>Időpont</TableHead>
                    <TableHead>Típus</TableHead>
                    <TableHead className="text-right">Státusz</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((b, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{b.date}</TableCell>
                      <TableCell>{b.time}</TableCell>
                      <TableCell className="text-zinc-500">{b.type}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className={
                            b.status === "confirmed"
                              ? "bg-lime/20 text-lime-dark border-lime/30"
                              : b.status === "completed"
                                ? "bg-zinc-100 text-zinc-600 border-zinc-200"
                                : "bg-red-500/10 text-red-600 border-red-500/20"
                          }
                        >
                          {b.status === "confirmed"
                            ? "Megerősítve"
                            : b.status === "completed"
                              ? "Teljesítve"
                              : "Lemondva"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents tab */}
        <TabsContent value="documents">
          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg">Dokumentumok</CardTitle>
              <CardDescription>
                Szerződések, egészségügyi nyilatkozatok és egyéb dokumentumok
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-zinc-100 p-4">
                  <svg
                    className="h-8 w-8 text-zinc-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="mt-4 text-sm font-medium text-zinc-700">
                  Még nincsenek feltöltött dokumentumok
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Dokumentumok feltöltése hamarosan elérhető lesz.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

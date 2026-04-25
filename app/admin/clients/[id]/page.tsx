import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Target, Heart } from "lucide-react";
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
import { db } from "@/lib/db";
import {
  users,
  clientProfiles,
  bookings,
  availabilitySlots,
  measurements,
} from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Felhasználó lekérdezése
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  if (!user || user.role !== "client") {
    notFound();
  }

  // Párhuzamos lekérdezések
  const [profileResult, bookingsResult, measurementsResult] = await Promise.all(
    [
      // Ügyfél profil
      db
        .select()
        .from(clientProfiles)
        .where(eq(clientProfiles.userId, id))
        .limit(1),

      // Legutóbbi foglalások
      db
        .select({
          id: bookings.id,
          date: bookings.date,
          status: bookings.status,
          startTime: availabilitySlots.startTime,
          endTime: availabilitySlots.endTime,
          sessionType: availabilitySlots.sessionType,
        })
        .from(bookings)
        .innerJoin(
          availabilitySlots,
          eq(bookings.slotId, availabilitySlots.id)
        )
        .where(eq(bookings.clientId, id))
        .orderBy(desc(bookings.date))
        .limit(20),

      // Legutóbbi mérések
      db
        .select()
        .from(measurements)
        .where(eq(measurements.clientId, id))
        .orderBy(desc(measurements.date))
        .limit(10),
    ]
  );

  const profile = profileResult[0] || null;

  const sessionTypeLabels: Record<string, string> = {
    personal: "Személyi edzés",
    group: "Csoportos edzés",
    online: "Online konzultáció",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/clients"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 w-10 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
            {user.name || "Névtelen ügyfél"}
          </h1>
          <div className="mt-1 flex items-center gap-3">
            <Badge
              variant="outline"
              className={
                user.isActive
                  ? "bg-lime/20 text-lime-dark border-lime/30"
                  : "bg-zinc-100 text-zinc-500 border-zinc-200"
              }
            >
              {user.isActive ? "Aktív" : "Inaktív"}
            </Badge>
            {profile?.fitnessLevel && (
              <span className="text-sm text-zinc-500">
                {profile.fitnessLevel === "beginner"
                  ? "Kezdő"
                  : profile.fitnessLevel === "intermediate"
                    ? "Középhaladó"
                    : "Haladó"}
              </span>
            )}
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
                  <span className="text-sm text-zinc-700">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-zinc-400" />
                  <span className="text-sm text-zinc-700">
                    {user.phone || "Nincs megadva"}
                  </span>
                </div>
                {profile?.dateOfBirth && (
                  <div className="pt-2 text-sm text-zinc-500">
                    <span className="font-medium text-zinc-700">
                      Születési dátum:
                    </span>{" "}
                    {profile.dateOfBirth}
                  </div>
                )}
                {profile?.gender && (
                  <div className="text-sm text-zinc-500">
                    <span className="font-medium text-zinc-700">Nem:</span>{" "}
                    {profile.gender === "male"
                      ? "Férfi"
                      : profile.gender === "female"
                        ? "Nő"
                        : profile.gender}
                  </div>
                )}
                {profile?.height && (
                  <div className="text-sm text-zinc-500">
                    <span className="font-medium text-zinc-700">
                      Magasság:
                    </span>{" "}
                    {profile.height} cm
                  </div>
                )}
                {profile?.weight && (
                  <div className="text-sm text-zinc-500">
                    <span className="font-medium text-zinc-700">
                      Testsúly:
                    </span>{" "}
                    {profile.weight} kg
                  </div>
                )}
                <div className="text-sm text-zinc-500">
                  <span className="font-medium text-zinc-700">Tag mióta:</span>{" "}
                  {user.createdAt.toLocaleDateString("hu-HU")}
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
                  {profile?.fitnessGoals && profile.fitnessGoals.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.fitnessGoals.map((goal) => (
                        <Badge
                          key={goal}
                          variant="outline"
                          className="bg-lime/10 text-lime-dark border-lime/20"
                        >
                          {goal}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500">
                      Nincsenek megadott célok.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-zinc-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Heart className="h-5 w-5 text-red-500" />
                    Egészségügyi állapot
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {profile?.healthConditions &&
                  profile.healthConditions.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {profile.healthConditions.map((cond) => (
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
                  {profile?.injuries && (
                    <div className="text-sm text-zinc-500">
                      <span className="font-medium text-zinc-700">
                        Sérülések:
                      </span>{" "}
                      {profile.injuries}
                    </div>
                  )}
                </CardContent>
              </Card>

              {(profile?.notes || profile?.emergencyContactName) && (
                <Card className="border-zinc-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Megjegyzések</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {profile?.notes && (
                      <p className="text-sm text-zinc-600">{profile.notes}</p>
                    )}
                    {profile?.emergencyContactName && (
                      <div className="text-sm text-zinc-500">
                        <span className="font-medium text-zinc-700">
                          Sürgősségi kapcsolat:
                        </span>{" "}
                        {profile.emergencyContactName}
                        {profile.emergencyContactPhone &&
                          ` (${profile.emergencyContactPhone})`}
                        {profile.emergencyContactRelation &&
                          ` - ${profile.emergencyContactRelation}`}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Measurements tab */}
        <TabsContent value="measurements">
          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg">Mérési előzmények</CardTitle>
              <CardDescription>
                Testsúly és testméretek alakulása
              </CardDescription>
            </CardHeader>
            <CardContent>
              {measurementsResult.length === 0 ? (
                <p className="py-8 text-center text-sm text-zinc-400">
                  Nincsenek rögzített mérések
                </p>
              ) : (
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
                    {measurementsResult.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="font-medium">{m.date}</TableCell>
                        <TableCell>{m.weight ?? "-"}</TableCell>
                        <TableCell>{m.chest ?? "-"}</TableCell>
                        <TableCell>{m.waist ?? "-"}</TableCell>
                        <TableCell>{m.hips ?? "-"}</TableCell>
                        <TableCell>
                          {m.leftArm != null && m.rightArm != null
                            ? `${m.leftArm} / ${m.rightArm}`
                            : m.leftArm ?? m.rightArm ?? "-"}
                        </TableCell>
                        <TableCell>{m.bodyFatPercentage ?? "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
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
              {bookingsResult.length === 0 ? (
                <p className="py-8 text-center text-sm text-zinc-400">
                  Nincsenek foglalások
                </p>
              ) : (
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
                    {bookingsResult.map((b) => (
                      <TableRow key={b.id}>
                        <TableCell className="font-medium">{b.date}</TableCell>
                        <TableCell>
                          {b.startTime?.slice(0, 5)} - {b.endTime?.slice(0, 5)}
                        </TableCell>
                        <TableCell className="text-zinc-500">
                          {sessionTypeLabels[b.sessionType] || b.sessionType}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className={
                              b.status === "confirmed"
                                ? "bg-lime/20 text-lime-dark border-lime/30"
                                : b.status === "completed"
                                  ? "bg-zinc-100 text-zinc-600 border-zinc-200"
                                  : b.status === "noshow"
                                    ? "bg-orange-500/10 text-orange-600 border-orange-500/20"
                                    : "bg-red-500/10 text-red-600 border-red-500/20"
                            }
                          >
                            {b.status === "confirmed"
                              ? "Megerősítve"
                              : b.status === "completed"
                                ? "Teljesítve"
                                : b.status === "noshow"
                                  ? "Nem jelent meg"
                                  : "Lemondva"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
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

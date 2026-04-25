"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarPlus,
  Dumbbell,
  Ruler,
  Clock,
  ChevronRight,
  Calendar,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  userName: string;
  nextSession: {
    date: string;
    time: string;
    type: string;
  } | null;
  weekDays: {
    day: string;
    date: string;
    hasSession: boolean;
    time: string | null;
  }[];
  weightData: {
    date: string;
    weight: number;
  }[];
  upcomingCount: number;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const months = [
    "január", "február", "március", "április", "május", "június",
    "július", "augusztus", "szeptember", "október", "november", "december",
  ];
  const days = ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"];
  return `${d.getFullYear()}. ${months[d.getMonth()]} ${d.getDate()}. (${days[d.getDay()]})`;
}

export function DashboardClient({
  userName,
  nextSession,
  weekDays,
  weightData,
  upcomingCount,
}: Props) {
  const firstName = userName.split(" ").pop() || userName;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-5xl space-y-6"
    >
      {/* Üdvözlés */}
      <motion.div variants={item}>
        <h1 className="font-heading text-2xl font-bold lg:text-3xl">
          Szia, {firstName}!
        </h1>
        <p className="mt-1 text-muted-foreground">
          Tartsd a lendületet, ma egy nagyszerű nap lesz!
        </p>
      </motion.div>

      {/* Következő edzés */}
      <motion.div variants={item}>
        {nextSession ? (
          <Card className="overflow-hidden border-2 border-lime">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-lime">
                  <Clock className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Következő edzés
                  </p>
                  <p className="mt-1 text-lg font-bold">
                    {formatDate(nextSession.date)} - {nextSession.time}
                  </p>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Dumbbell className="h-4 w-4" />
                    <span>{nextSession.type}</span>
                  </div>
                </div>
              </div>
              <Link href="/dashboard/bookings">
                <Button variant="outline" size="sm">
                  Foglalásaim
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="overflow-hidden border-dashed border-2 border-zinc-300">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
              <Calendar className="h-12 w-12 text-zinc-300" />
              <div>
                <p className="font-semibold text-zinc-700">
                  Nincs közelgő edzésed
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Foglalj időpontot, hogy folytathasd az edzéstervedet!
                </p>
              </div>
              <Link href="/dashboard/bookings">
                <Button className="bg-lime text-zinc-900 hover:bg-lime-dark font-semibold">
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Időpont foglalása
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Gyors műveletek */}
      <motion.div variants={item} className="grid grid-cols-3 gap-3">
        <Link href="/dashboard/bookings">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
              <CalendarPlus className="h-6 w-6 text-lime" />
              <span className="text-sm font-medium">Foglalj időpontot</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/my-plan">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
              <Dumbbell className="h-6 w-6 text-lime" />
              <span className="text-sm font-medium">Edzéstervem</span>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/progress">
          <Card className="cursor-pointer transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col items-center gap-2 p-4 text-center">
              <Ruler className="h-6 w-6 text-lime" />
              <span className="text-sm font-medium">Mérés rögzítése</span>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Heti áttekintés */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Heti áttekintés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((d) => (
                  <div
                    key={d.day}
                    className={`flex flex-col items-center rounded-lg p-2 text-center ${
                      d.hasSession
                        ? "bg-lime/10 ring-1 ring-lime/30"
                        : "bg-zinc-50"
                    }`}
                  >
                    <span className="text-xs font-semibold text-muted-foreground">
                      {d.day}
                    </span>
                    <span className="mt-0.5 text-xs">{d.date}</span>
                    {d.hasSession && (
                      <span className="mt-1 text-[10px] font-medium text-lime-dark">
                        {d.time}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground text-center">
                {upcomingCount} közelgő edzés
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Súly grafikon */}
        <motion.div variants={item}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Testsúly alakulás</CardTitle>
                {weightData.length >= 2 && (
                  <span className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingDown className="h-3 w-3" />
                    {(weightData[0].weight - weightData[weightData.length - 1].weight).toFixed(1)} kg
                  </span>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {weightData.length > 0 ? (
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weightData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10 }}
                        stroke="#a1a1aa"
                      />
                      <YAxis
                        domain={["dataMin - 1", "dataMax + 1"]}
                        tick={{ fontSize: 10 }}
                        stroke="#a1a1aa"
                      />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#bde800"
                        strokeWidth={2.5}
                        dot={{ fill: "#bde800", r: 3 }}
                        name="Súly (kg)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 py-8 text-center">
                  <Ruler className="h-8 w-8 text-zinc-300" />
                  <p className="text-sm text-muted-foreground">
                    Még nincs mérési adatod. Rögzítsd az első mérésedet!
                  </p>
                  <Link href="/dashboard/progress">
                    <Button variant="outline" size="sm">
                      Mérés rögzítése
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

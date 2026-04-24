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
  User,
  ChevronRight,
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

const weightData = [
  { week: "Hét 1", weight: 82 },
  { week: "Hét 2", weight: 81.2 },
  { week: "Hét 3", weight: 80.5 },
  { week: "Hét 4", weight: 79.8 },
];

const weekDays = [
  { day: "H", date: "04.21", hasSession: true, time: "09:00" },
  { day: "K", date: "04.22", hasSession: false, time: null },
  { day: "Sz", date: "04.23", hasSession: true, time: "10:00" },
  { day: "Cs", date: "04.24", hasSession: false, time: null },
  { day: "P", date: "04.25", hasSession: true, time: "08:00" },
  { day: "Szo", date: "04.26", hasSession: false, time: null },
  { day: "V", date: "04.27", hasSession: false, time: null },
];

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

export default function DashboardPage() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-5xl space-y-6"
    >
      {/* Welcome */}
      <motion.div variants={item}>
        <h1 className="font-heading text-2xl font-bold lg:text-3xl">
          Szia, Tamás! 💪
        </h1>
        <p className="mt-1 text-muted-foreground">
          Tartsd a lendületet, ma egy nagyszerű nap lesz!
        </p>
      </motion.div>

      {/* Next Session Card */}
      <motion.div variants={item}>
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
                  2026. április 23. (szerda) - 10:00
                </p>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Dumbbell className="h-4 w-4" />
                  <span>Felsőtest edzés</span>
                  <span className="text-border">|</span>
                  <User className="h-4 w-4" />
                  <span>Kovács Péter</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="rounded-lg bg-lime/20 px-4 py-2 text-center">
                <p className="text-2xl font-bold text-foreground">2 óra</p>
                <p className="text-xs text-muted-foreground">múlva kezdődik</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={item} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Link href="/dashboard/bookings">
          <Card className="cursor-pointer transition-all hover:border-lime hover:shadow-md">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime/20">
                <CalendarPlus className="h-5 w-5 text-lime-dark" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Foglalj időpontot</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/my-plan">
          <Card className="cursor-pointer transition-all hover:border-lime hover:shadow-md">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime/20">
                <Dumbbell className="h-5 w-5 text-lime-dark" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Nézd meg az edzésterved</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/progress">
          <Card className="cursor-pointer transition-all hover:border-lime hover:shadow-md">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-lime/20">
                <Ruler className="h-5 w-5 text-lime-dark" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Rögzíts mérést</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Weekly Overview */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Heti áttekintés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((d) => (
                  <div
                    key={d.day}
                    className={`flex flex-col items-center rounded-lg p-2 text-center ${
                      d.hasSession
                        ? "bg-lime/20 ring-1 ring-lime"
                        : "bg-muted/50"
                    }`}
                  >
                    <span className="text-xs font-semibold text-muted-foreground">
                      {d.day}
                    </span>
                    <span className="mt-0.5 text-xs">{d.date}</span>
                    {d.hasSession && (
                      <span className="mt-1 text-[10px] font-bold text-foreground">
                        {d.time}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weight Trend */}
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Testsúly alakulása</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                    <YAxis
                      domain={["dataMin - 1", "dataMax + 1"]}
                      tick={{ fontSize: 12 }}
                      unit=" kg"
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "8px",
                        border: "1px solid #e5e7eb",
                      }}
                      formatter={(value) => [`${value} kg`, "Súly"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#bde800"
                      strokeWidth={3}
                      dot={{ fill: "#bde800", r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

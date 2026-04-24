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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingDown,
  Plus,
  Trophy,
  Camera,
  Scale,
  Ruler,
} from "lucide-react";
import { toast } from "sonner";

const weightData = [
  { date: "Jan 15", weight: 82 },
  { date: "Feb 1", weight: 80.5 },
  { date: "Feb 15", weight: 79.8 },
  { date: "Már 1", weight: 78.2 },
  { date: "Már 15", weight: 77.5 },
  { date: "Ápr 1", weight: 76.8 },
  { date: "Ápr 15", weight: 75.5 },
  { date: "Ápr 24", weight: 74.8 },
];

const measurements = [
  { date: "2026-04-24", weight: 74.8, bodyFat: 18.2, chest: 96, waist: 78, hips: 96, biceps: 34 },
  { date: "2026-04-10", weight: 76.2, bodyFat: 19.5, chest: 97, waist: 80, hips: 97, biceps: 33.5 },
  { date: "2026-03-27", weight: 77.5, bodyFat: 20.8, chest: 98, waist: 82, hips: 98, biceps: 33 },
  { date: "2026-03-13", weight: 78.2, bodyFat: 21.5, chest: 99, waist: 83, hips: 99, biceps: 32.5 },
  { date: "2026-02-28", weight: 80.5, bodyFat: 23.0, chest: 100, waist: 86, hips: 100, biceps: 32 },
  { date: "2026-02-14", weight: 82.0, bodyFat: 24.5, chest: 101, waist: 88, hips: 101, biceps: 31.5 },
];

const personalRecords = [
  { exercise: "Guggolás (Squat)", maxWeight: "100 kg", date: "2026-04-20", previous: "95 kg" },
  { exercise: "Fekvenyomás (Bench Press)", maxWeight: "80 kg", date: "2026-04-18", previous: "75 kg" },
  { exercise: "Felhúzás (Deadlift)", maxWeight: "130 kg", date: "2026-04-15", previous: "125 kg" },
  { exercise: "Vállból nyomás (OHP)", maxWeight: "55 kg", date: "2026-04-10", previous: "50 kg" },
  { exercise: "Evezés (Barbell Row)", maxWeight: "70 kg", date: "2026-04-08", previous: "65 kg" },
  { exercise: "Csípő emelés (Hip Thrust)", maxWeight: "120 kg", date: "2026-04-05", previous: "110 kg" },
];

const strengthData = [
  { date: "Feb", squat: 70, bench: 55, deadlift: 90 },
  { date: "Már", squat: 85, bench: 65, deadlift: 110 },
  { date: "Ápr", squat: 100, bench: 80, deadlift: 130 },
];

const progressPhotos = [
  { date: "2026-02-01", label: "Kezdés" },
  { date: "2026-03-01", label: "4. hét" },
  { date: "2026-04-01", label: "8. hét" },
  { date: "2026-04-24", label: "12. hét" },
];

export default function ProgressPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const totalLoss = (measurements[measurements.length - 1].weight - measurements[0].weight).toFixed(1);
  const fatLoss = (measurements[measurements.length - 1].bodyFat - measurements[0].bodyFat).toFixed(1);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
            Haladásom
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Kövesd nyomon a fejlődésedet
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none bg-lime text-zinc-900 hover:bg-lime-dark font-semibold h-10 px-4 py-2">
              <Plus className="h-4 w-4 mr-2" />
              Új mérés
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Új mérés rögzítése</DialogTitle>
              <DialogDescription>
                Rögzítsd a legfrissebb mérési adataidat
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Testsúly (kg)</Label>
                  <Input type="number" step="0.1" placeholder="74.5" />
                </div>
                <div className="space-y-2">
                  <Label>Testzsír (%)</Label>
                  <Input type="number" step="0.1" placeholder="18.0" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Mellkas (cm)</Label>
                  <Input type="number" step="0.5" placeholder="96" />
                </div>
                <div className="space-y-2">
                  <Label>Derék (cm)</Label>
                  <Input type="number" step="0.5" placeholder="78" />
                </div>
                <div className="space-y-2">
                  <Label>Csípő (cm)</Label>
                  <Input type="number" step="0.5" placeholder="96" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Bicepsz (cm)</Label>
                  <Input type="number" step="0.5" placeholder="34" />
                </div>
                <div className="space-y-2">
                  <Label>Comb (cm)</Label>
                  <Input type="number" step="0.5" placeholder="56" />
                </div>
              </div>
              <Button
                onClick={() => {
                  setDialogOpen(false);
                  toast.success("Mérés rögzítve!");
                }}
                className="w-full bg-lime text-zinc-900 hover:bg-lime-dark font-semibold"
              >
                Mentés
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-zinc-200">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-1">
              <Scale className="h-4 w-4 text-lime" />
              <p className="text-xs text-zinc-500">Aktuális súly</p>
            </div>
            <p className="text-2xl font-bold">{measurements[0].weight} kg</p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3" />
              {totalLoss} kg összesen
            </p>
          </CardContent>
        </Card>
        <Card className="border-zinc-200">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-1">
              <Ruler className="h-4 w-4 text-lime" />
              <p className="text-xs text-zinc-500">Testzsír</p>
            </div>
            <p className="text-2xl font-bold">{measurements[0].bodyFat}%</p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3" />
              {fatLoss}% összesen
            </p>
          </CardContent>
        </Card>
        <Card className="border-zinc-200">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-1">
              <Ruler className="h-4 w-4 text-lime" />
              <p className="text-xs text-zinc-500">Derékbőség</p>
            </div>
            <p className="text-2xl font-bold">{measurements[0].waist} cm</p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3" />
              -{measurements[measurements.length - 1].waist - measurements[0].waist} cm
            </p>
          </CardContent>
        </Card>
        <Card className="border-zinc-200">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="h-4 w-4 text-lime" />
              <p className="text-xs text-zinc-500">Személyi rekordok</p>
            </div>
            <p className="text-2xl font-bold">{personalRecords.length}</p>
            <p className="text-xs text-zinc-500 mt-1">Megdöntött PR</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="measurements">
        <TabsList>
          <TabsTrigger value="measurements">Mérések</TabsTrigger>
          <TabsTrigger value="strength">Erő</TabsTrigger>
          <TabsTrigger value="photos">Fotók</TabsTrigger>
        </TabsList>

        {/* Measurements Tab */}
        <TabsContent value="measurements" className="mt-6 space-y-6">
          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg">Testsúly alakulás</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#a1a1aa" />
                    <YAxis domain={["dataMin - 2", "dataMax + 2"]} tick={{ fontSize: 12 }} stroke="#a1a1aa" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="#bde800"
                      strokeWidth={3}
                      dot={{ fill: "#bde800", strokeWidth: 2, r: 4 }}
                      name="Súly (kg)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg">Mérési előzmények</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dátum</TableHead>
                    <TableHead>Súly</TableHead>
                    <TableHead>Testzsír</TableHead>
                    <TableHead>Mellkas</TableHead>
                    <TableHead>Derék</TableHead>
                    <TableHead>Csípő</TableHead>
                    <TableHead>Bicepsz</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {measurements.map((m) => (
                    <TableRow key={m.date}>
                      <TableCell className="font-medium text-sm">{m.date}</TableCell>
                      <TableCell className="text-sm">{m.weight} kg</TableCell>
                      <TableCell className="text-sm">{m.bodyFat}%</TableCell>
                      <TableCell className="text-sm">{m.chest} cm</TableCell>
                      <TableCell className="text-sm">{m.waist} cm</TableCell>
                      <TableCell className="text-sm">{m.hips} cm</TableCell>
                      <TableCell className="text-sm">{m.biceps} cm</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strength Tab */}
        <TabsContent value="strength" className="mt-6 space-y-6">
          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg">Erő fejlődés</CardTitle>
              <CardDescription>
                A fő compound gyakorlatok maximális súlyai
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={strengthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#a1a1aa" />
                    <YAxis tick={{ fontSize: 12 }} stroke="#a1a1aa" />
                    <Tooltip />
                    <Line type="monotone" dataKey="squat" stroke="#bde800" strokeWidth={2} name="Guggolás (kg)" />
                    <Line type="monotone" dataKey="bench" stroke="#3b82f6" strokeWidth={2} name="Fekvenyomás (kg)" />
                    <Line type="monotone" dataKey="deadlift" stroke="#a855f7" strokeWidth={2} name="Felhúzás (kg)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200">
            <CardHeader>
              <CardTitle className="text-lg">Személyi rekordok</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Gyakorlat</TableHead>
                    <TableHead>Max súly</TableHead>
                    <TableHead>Előző PR</TableHead>
                    <TableHead>Dátum</TableHead>
                    <TableHead>Növekedés</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {personalRecords.map((pr) => (
                    <TableRow key={pr.exercise}>
                      <TableCell className="font-medium text-sm">{pr.exercise}</TableCell>
                      <TableCell className="text-sm font-bold text-lime-dark">{pr.maxWeight}</TableCell>
                      <TableCell className="text-sm text-zinc-500">{pr.previous}</TableCell>
                      <TableCell className="text-sm text-zinc-500">{pr.date}</TableCell>
                      <TableCell>
                        <Badge className="bg-lime/20 text-lime-dark border-lime/30">
                          <Trophy className="h-3 w-3 mr-1" />
                          +{parseInt(pr.maxWeight) - parseInt(pr.previous)} kg
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Photos Tab */}
        <TabsContent value="photos" className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-zinc-900">Progress fotók</h3>
            <Button variant="outline">
              <Camera className="h-4 w-4 mr-2" />
              Fotó feltöltése
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {progressPhotos.map((photo) => (
              <Card key={photo.date} className="border-zinc-200 overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-zinc-200 to-zinc-100 flex items-center justify-center">
                  <Camera className="h-10 w-10 text-zinc-300" />
                </div>
                <CardContent className="p-3 text-center">
                  <p className="text-sm font-medium text-zinc-900">{photo.label}</p>
                  <p className="text-xs text-zinc-500">{photo.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

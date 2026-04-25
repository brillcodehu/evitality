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
import { addMeasurement } from "@/lib/actions/measurement-actions";

type Measurement = {
  id: string;
  date: string;
  weight: number | null;
  bodyFat: number | null;
  chest: number | null;
  waist: number | null;
  hips: number | null;
  biceps: number | null;
  thigh: number | null;
};

type PersonalRecord = {
  id: string;
  exerciseName: string;
  weight: number;
  reps: number | null;
  achievedAt: string;
};

type Props = {
  measurements: Measurement[];
  personalRecords: PersonalRecord[];
};

export function ProgressClient({ measurements, personalRecords }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const weightData = measurements
    .filter((m) => m.weight !== null)
    .reverse()
    .map((m) => ({
      date: m.date,
      weight: m.weight!,
    }));

  const latestWeight = measurements[0]?.weight;
  const oldestWeight = measurements[measurements.length - 1]?.weight;
  const totalWeightChange =
    latestWeight && oldestWeight
      ? (latestWeight - oldestWeight).toFixed(1)
      : null;

  const latestFat = measurements[0]?.bodyFat;
  const latestWaist = measurements[0]?.waist;

  async function handleAddMeasurement(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await addMeasurement(formData);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Mérés rögzítve!");
      setDialogOpen(false);
      window.location.reload();
    }
  }

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
          <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-lime text-zinc-900 hover:bg-lime-dark font-semibold h-10 px-4 py-2">
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
            <form onSubmit={handleAddMeasurement} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Testsúly (kg)</Label>
                  <Input id="weight" name="weight" type="number" step="0.1" placeholder="74.5" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bodyFat">Testzsír (%)</Label>
                  <Input id="bodyFat" name="bodyFat" type="number" step="0.1" placeholder="18.0" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="chest">Mellkas (cm)</Label>
                  <Input id="chest" name="chest" type="number" step="0.5" placeholder="96" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist">Derék (cm)</Label>
                  <Input id="waist" name="waist" type="number" step="0.5" placeholder="78" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hips">Csípő (cm)</Label>
                  <Input id="hips" name="hips" type="number" step="0.5" placeholder="96" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="biceps">Bicepsz (cm)</Label>
                  <Input id="biceps" name="biceps" type="number" step="0.5" placeholder="34" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thigh">Comb (cm)</Label>
                  <Input id="thigh" name="thigh" type="number" step="0.5" placeholder="56" />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-lime text-zinc-900 hover:bg-lime-dark font-semibold"
              >
                Mentés
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Összefoglaló kártyák */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-zinc-200">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-1">
              <Scale className="h-4 w-4 text-lime" />
              <p className="text-xs text-zinc-500">Aktuális súly</p>
            </div>
            <p className="text-2xl font-bold">
              {latestWeight ? `${latestWeight} kg` : "-"}
            </p>
            {totalWeightChange && (
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingDown className="h-3 w-3" />
                {totalWeightChange} kg összesen
              </p>
            )}
          </CardContent>
        </Card>
        <Card className="border-zinc-200">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-1">
              <Ruler className="h-4 w-4 text-lime" />
              <p className="text-xs text-zinc-500">Testzsír</p>
            </div>
            <p className="text-2xl font-bold">
              {latestFat ? `${latestFat}%` : "-"}
            </p>
          </CardContent>
        </Card>
        <Card className="border-zinc-200">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-1">
              <Ruler className="h-4 w-4 text-lime" />
              <p className="text-xs text-zinc-500">Derékbőség</p>
            </div>
            <p className="text-2xl font-bold">
              {latestWaist ? `${latestWaist} cm` : "-"}
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
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="measurements">
        <TabsList>
          <TabsTrigger value="measurements">Mérések</TabsTrigger>
          <TabsTrigger value="strength">Erő</TabsTrigger>
          <TabsTrigger value="photos">Fotók</TabsTrigger>
        </TabsList>

        {/* Mérések tab */}
        <TabsContent value="measurements" className="mt-6 space-y-6">
          {weightData.length > 0 ? (
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
          ) : (
            <Card className="border-dashed border-2 border-zinc-200">
              <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                <Scale className="h-12 w-12 text-zinc-300" />
                <p className="text-zinc-500">Még nincs mérési adatod.</p>
                <p className="text-sm text-zinc-400">
                  Kattints az &quot;Új mérés&quot; gombra az első mérés rögzítéséhez.
                </p>
              </CardContent>
            </Card>
          )}

          {measurements.length > 0 && (
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
                      <TableRow key={m.id}>
                        <TableCell className="font-medium text-sm">{m.date}</TableCell>
                        <TableCell className="text-sm">{m.weight ? `${m.weight} kg` : "-"}</TableCell>
                        <TableCell className="text-sm">{m.bodyFat ? `${m.bodyFat}%` : "-"}</TableCell>
                        <TableCell className="text-sm">{m.chest ? `${m.chest} cm` : "-"}</TableCell>
                        <TableCell className="text-sm">{m.waist ? `${m.waist} cm` : "-"}</TableCell>
                        <TableCell className="text-sm">{m.hips ? `${m.hips} cm` : "-"}</TableCell>
                        <TableCell className="text-sm">{m.biceps ? `${m.biceps} cm` : "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Erő tab */}
        <TabsContent value="strength" className="mt-6 space-y-6">
          {personalRecords.length > 0 ? (
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
                      <TableHead>Ismétlés</TableHead>
                      <TableHead>Dátum</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {personalRecords.map((pr) => (
                      <TableRow key={pr.id}>
                        <TableCell className="font-medium text-sm">{pr.exerciseName}</TableCell>
                        <TableCell className="text-sm font-bold text-lime-dark">{pr.weight} kg</TableCell>
                        <TableCell className="text-sm">{pr.reps || "-"}</TableCell>
                        <TableCell className="text-sm text-zinc-500">{pr.achievedAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-dashed border-2 border-zinc-200">
              <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                <Trophy className="h-12 w-12 text-zinc-300" />
                <p className="text-zinc-500">Még nincs személyi rekordod.</p>
                <p className="text-sm text-zinc-400">
                  A rekordok az edzéseid során automatikusan rögzülnek.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Fotók tab */}
        <TabsContent value="photos" className="mt-6 space-y-6">
          <Card className="border-dashed border-2 border-zinc-200">
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <Camera className="h-12 w-12 text-zinc-300" />
              <p className="text-zinc-500">A progress fotó feltöltés hamarosan elérhető.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

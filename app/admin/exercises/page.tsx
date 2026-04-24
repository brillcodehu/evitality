"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Search, Dumbbell, Video } from "lucide-react";
import { toast } from "sonner";

type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  description: string;
  hasVideo: boolean;
};

const exercises: Exercise[] = [
  { id: "1", name: "Guggolás (Squat)", muscleGroup: "Láb", equipment: "Szabad súly", description: "Alapvető alsó test gyakorlat. Térd és csípő hajlítás egyidejűleg, egyenes háttal.", hasVideo: true },
  { id: "2", name: "Fekvenyomás (Bench Press)", muscleGroup: "Mellkas", equipment: "Szabad súly", description: "Mellkas alapgyakorlat. Hanyatt fekvő pozícióból nyomás felfelé.", hasVideo: true },
  { id: "3", name: "Felhúzás (Deadlift)", muscleGroup: "Hát", equipment: "Szabad súly", description: "Teljes test compound gyakorlat. Földről történő emelés egyenes háttal.", hasVideo: true },
  { id: "4", name: "Húzódzkodás (Pull-up)", muscleGroup: "Hát", equipment: "Saját testsúly", description: "Felső test húzó gyakorlat. Széles fogás, teljes mozgásterjedelem.", hasVideo: true },
  { id: "5", name: "Vállból nyomás (OHP)", muscleGroup: "Váll", equipment: "Szabad súly", description: "Álló helyzetben fejre nyomás. Váll deltoid fő gyakorlat.", hasVideo: true },
  { id: "6", name: "Bicepsz hajlítás", muscleGroup: "Kar", equipment: "Szabad súly", description: "Izolációs gyakorlat a bicepszre. Álló vagy ülő pozícióban.", hasVideo: false },
  { id: "7", name: "Tricepsz tolás (Dip)", muscleGroup: "Kar", equipment: "Saját testsúly", description: "Párhuzamos korlát közötti tolódzkodás, tricepsz fókusszal.", hasVideo: true },
  { id: "8", name: "Plank (Tartás)", muscleGroup: "Core", equipment: "Saját testsúly", description: "Statikus core stabilizáló gyakorlat. Könyökre támaszkodva, egyenes test.", hasVideo: false },
  { id: "9", name: "Kitörés (Lunge)", muscleGroup: "Láb", equipment: "Szabad súly", description: "Egyoldali láb gyakorlat, előre lépéssel. Kiváló egyensúly fejlesztő.", hasVideo: true },
  { id: "10", name: "Evezés (Barbell Row)", muscleGroup: "Hát", equipment: "Szabad súly", description: "Előrehajolva végzett evezés. Széles hát és romboid fejlesztés.", hasVideo: true },
  { id: "11", name: "Csípő emelés (Hip Thrust)", muscleGroup: "Láb", equipment: "Szabad súly", description: "Gluteus maximus izolációs gyakorlat. Padra támaszkodva, csípő emelés.", hasVideo: true },
  { id: "12", name: "Oldalemelés (Lateral Raise)", muscleGroup: "Váll", equipment: "Szabad súly", description: "Oldalsó deltoid izolációs gyakorlat kézisúlyzóval.", hasVideo: false },
];

const muscleGroups = ["Összes", "Láb", "Mellkas", "Hát", "Váll", "Kar", "Core"];

const muscleGroupColors: Record<string, string> = {
  Láb: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  Mellkas: "bg-red-500/10 text-red-600 border-red-500/20",
  Hát: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  Váll: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  Kar: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  Core: "bg-teal-500/10 text-teal-600 border-teal-500/20",
};

export default function ExercisesPage() {
  const [filter, setFilter] = useState("Összes");
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = exercises.filter((ex) => {
    const matchGroup = filter === "Összes" || ex.muscleGroup === filter;
    const matchSearch =
      search === "" ||
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      ex.equipment.toLowerCase().includes(search.toLowerCase());
    return matchGroup && matchSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
            Gyakorlat könyvtár
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            {exercises.length} gyakorlat a könyvtárban
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none bg-lime text-zinc-900 hover:bg-lime-dark font-semibold h-10 px-4 py-2">
              <Plus className="h-4 w-4 mr-2" />
              Új gyakorlat
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Új gyakorlat</DialogTitle>
              <DialogDescription>
                Add hozzá a gyakorlatot a könyvtáradhoz
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Gyakorlat neve</Label>
                <Input placeholder="pl. Guggolás (Squat)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Izomcsoport</Label>
                  <Select defaultValue="Láb">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {muscleGroups.filter((g) => g !== "Összes").map((g) => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Eszköz</Label>
                  <Select defaultValue="Szabad súly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Szabad súly">Szabad súly</SelectItem>
                      <SelectItem value="Saját testsúly">Saját testsúly</SelectItem>
                      <SelectItem value="Gép">Gép</SelectItem>
                      <SelectItem value="Kábel">Kábel</SelectItem>
                      <SelectItem value="Kettlebell">Kettlebell</SelectItem>
                      <SelectItem value="Gumiszalag">Gumiszalag</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Leírás</Label>
                <Textarea placeholder="A gyakorlat végrehajtásának leírása..." rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Videó URL (opcionális)</Label>
                <Input placeholder="https://youtube.com/..." />
              </div>
              <Button
                onClick={() => {
                  setDialogOpen(false);
                  toast.success("Gyakorlat hozzáadva!");
                }}
                className="w-full bg-lime text-zinc-900 hover:bg-lime-dark font-semibold"
              >
                Hozzáadás
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input
            placeholder="Keresés név vagy eszköz alapján..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {muscleGroups.map((group) => (
            <Button
              key={group}
              variant={filter === group ? "default" : "outline"}
              size="sm"
              className={filter === group ? "bg-lime text-zinc-900 hover:bg-lime-dark" : ""}
              onClick={() => setFilter(group)}
            >
              {group}
            </Button>
          ))}
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((exercise) => (
          <Card key={exercise.id} className="border-zinc-200 hover:shadow-md transition-shadow">
            <div className="h-32 bg-gradient-to-br from-zinc-100 to-zinc-50 flex items-center justify-center relative">
              <Dumbbell className="h-10 w-10 text-zinc-300" />
              {exercise.hasVideo && (
                <div className="absolute top-2 right-2">
                  <Badge className="bg-lime/80 text-zinc-900 text-xs">
                    <Video className="h-3 w-3 mr-1" />
                    Videó
                  </Badge>
                </div>
              )}
            </div>
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold text-zinc-900 text-sm">
                {exercise.name}
              </h3>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={muscleGroupColors[exercise.muscleGroup] || ""}
                >
                  {exercise.muscleGroup}
                </Badge>
                <span className="text-xs text-zinc-500">{exercise.equipment}</span>
              </div>
              <p className="text-xs text-zinc-500 line-clamp-2">
                {exercise.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-zinc-400">
          <Dumbbell className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p>Nincs találat a szűrési feltételekre</p>
        </div>
      )}
    </div>
  );
}

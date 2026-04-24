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
import {
  Plus,
  Dumbbell,
  Users,
  Calendar,
  MoreHorizontal,
  Pencil,
  Trash2,
  Copy,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type Program = {
  id: string;
  name: string;
  description: string;
  durationWeeks: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  targetGoal: string;
  assignedClients: number;
  isTemplate: boolean;
};

const initialPrograms: Program[] = [
  {
    id: "1",
    name: "12 Hetes Fogyás Program",
    description: "Intenzív fogyókúrás program kalória deficit mellett, kardió és erőedzés kombinációval. Heti 4 edzés, progresszív túlterhelés.",
    durationWeeks: 12,
    difficulty: "intermediate",
    targetGoal: "Fogyás",
    assignedClients: 5,
    isTemplate: true,
  },
  {
    id: "2",
    name: "Erőnövelő Program",
    description: "Compound mozdulatokra épülő erőnövelő program: guggolás, fekvenyomás, felhúzás, vállból nyomás. Heti 5 edzés, periodizált tervezés.",
    durationWeeks: 16,
    difficulty: "advanced",
    targetGoal: "Erőnövelés",
    assignedClients: 3,
    isTemplate: true,
  },
  {
    id: "3",
    name: "Kezdő Csomag",
    description: "Alapozó program edzőtermi kezdőknek. Gépes és szabad súlyos gyakorlatok tanulása helyes technikával. Heti 3 edzés.",
    durationWeeks: 8,
    difficulty: "beginner",
    targetGoal: "Alapozás",
    assignedClients: 8,
    isTemplate: true,
  },
  {
    id: "4",
    name: "Rehabilitációs Program",
    description: "Sérülés utáni rehabilitáció, korrekciós gyakorlatok, mobilizáció és stabilizáció. Orvosi engedéllyel, fokozatos terhelés növelés.",
    durationWeeks: 10,
    difficulty: "beginner",
    targetGoal: "Rehabilitáció",
    assignedClients: 2,
    isTemplate: true,
  },
  {
    id: "5",
    name: "HIIT & Conditioning",
    description: "Magas intenzitású intervallum edzés a maximális zsírégetésért. Köredzések, AMRAP, EMOM protokollokkal. Heti 4 edzés.",
    durationWeeks: 8,
    difficulty: "advanced",
    targetGoal: "Kondíció",
    assignedClients: 4,
    isTemplate: true,
  },
  {
    id: "6",
    name: "Testépítő Bulk Program",
    description: "Izomtömeg növelő program kalória szufficittel. Izomcsoport felosztás (push/pull/legs), heti 6 edzés.",
    durationWeeks: 20,
    difficulty: "advanced",
    targetGoal: "Izomépítés",
    assignedClients: 2,
    isTemplate: true,
  },
];

const difficultyLabels: Record<string, { label: string; className: string }> = {
  beginner: { label: "Kezdő", className: "bg-green-500/10 text-green-600 border-green-500/20" },
  intermediate: { label: "Középhaladó", className: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20" },
  advanced: { label: "Haladó", className: "bg-red-500/10 text-red-600 border-red-500/20" },
};

export default function ProgramsPage() {
  const [programs] = useState<Program[]>(initialPrograms);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
            Edzésprogramok
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Készíts és kezelj edzésprogramokat az ügyfeleidnek
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none bg-lime text-zinc-900 hover:bg-lime-dark font-semibold h-10 px-4 py-2">
              <Plus className="h-4 w-4 mr-2" />
              Új program
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Új edzésprogram</DialogTitle>
              <DialogDescription>
                Hozz létre egy új edzésprogram sablont
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Program neve</Label>
                <Input placeholder="pl. 12 Hetes Fogyás Program" />
              </div>
              <div className="space-y-2">
                <Label>Leírás</Label>
                <Textarea placeholder="Rövid leírás a programról..." rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Időtartam (hét)</Label>
                  <Input type="number" min={1} max={52} defaultValue={12} />
                </div>
                <div className="space-y-2">
                  <Label>Nehézség</Label>
                  <Select defaultValue="intermediate">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Kezdő</SelectItem>
                      <SelectItem value="intermediate">Középhaladó</SelectItem>
                      <SelectItem value="advanced">Haladó</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Cél</Label>
                <Input placeholder="pl. Fogyás, Erőnövelés, Rehabilitáció" />
              </div>
              <Button
                onClick={() => {
                  setDialogOpen(false);
                  toast.success("Program létrehozva!");
                }}
                className="w-full bg-lime text-zinc-900 hover:bg-lime-dark font-semibold"
              >
                Létrehozás
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Programs Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {programs.map((program) => {
          const diff = difficultyLabels[program.difficulty];
          return (
            <Card key={program.id} className="border-zinc-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold text-zinc-900">
                      {program.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={diff.className}>
                        {diff.label}
                      </Badge>
                      <Badge variant="outline" className="bg-zinc-100 text-zinc-600 border-zinc-200">
                        {program.targetGoal}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium h-8 w-8 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none">
                        <MoreHorizontal className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Pencil className="h-4 w-4 mr-2" />
                        Szerkesztés
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplikálás
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Törlés
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-zinc-600 line-clamp-2">
                  {program.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {program.durationWeeks} hét
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {program.assignedClients} ügyfél
                  </span>
                  <span className="flex items-center gap-1">
                    <Dumbbell className="h-3.5 w-3.5" />
                    Sablon
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

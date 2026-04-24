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
import { Plus, Users, Flame, Beef, Wheat, Droplets, MoreHorizontal, Pencil, Copy, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

type NutritionPlan = {
  id: string;
  name: string;
  description: string;
  dailyCalories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  assignedClients: number;
};

const plans: NutritionPlan[] = [
  {
    id: "1",
    name: "Fogyókúra - Nők",
    description: "Kalória deficit étrend nőknek, magas fehérje bevitellel az izommegtartásért. Napi 5 étkezés, kiegyensúlyozott makró elosztás.",
    dailyCalories: 1600,
    proteinG: 130,
    carbsG: 140,
    fatG: 55,
    assignedClients: 4,
  },
  {
    id: "2",
    name: "Fogyókúra - Férfiak",
    description: "Mérsékelt kalória deficit férfiaknak. Magas fehérje, közepes szénhidrát az edzésteljesítmény fenntartásáért.",
    dailyCalories: 2200,
    proteinG: 180,
    carbsG: 200,
    fatG: 70,
    assignedClients: 3,
  },
  {
    id: "3",
    name: "Izomépítő (Bulk)",
    description: "Kalória szufficit étrend izomtömeg növeléshez. Magas szénhidrát az edzés támogatásáért, magas fehérje az izomszintézisért.",
    dailyCalories: 3000,
    proteinG: 200,
    carbsG: 350,
    fatG: 85,
    assignedClients: 2,
  },
  {
    id: "4",
    name: "Karbonhidrát ciklizálás",
    description: "Edzésnapokon magasabb szénhidrát, pihenőnapokon alacsonyabb. Optimális az izomépítés és zsírvesztés párhuzamos eléréséhez.",
    dailyCalories: 2400,
    proteinG: 170,
    carbsG: 250,
    fatG: 75,
    assignedClients: 2,
  },
  {
    id: "5",
    name: "Fenntartó étrend",
    description: "Kalória egyensúly fenntartó étrend elért eredmények megtartásához. Kiegyensúlyozott makró elosztás, változatos ételek.",
    dailyCalories: 2000,
    proteinG: 140,
    carbsG: 220,
    fatG: 65,
    assignedClients: 6,
  },
];

function MacroBar({ label, value, max, color, icon: Icon }: {
  label: string;
  value: number;
  max: number;
  color: string;
  icon: React.ElementType;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1 text-zinc-500">
          <Icon className="h-3 w-3" />
          {label}
        </span>
        <span className="font-medium text-zinc-700">{value}g</span>
      </div>
      <Progress value={(value / max) * 100} className={`h-1.5 ${color}`} />
    </div>
  );
}

export default function NutritionPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
            Táplálkozási tervek
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Étrend sablonok és kiosztott étrendek kezelése
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none bg-lime text-zinc-900 hover:bg-lime-dark font-semibold h-10 px-4 py-2">
              <Plus className="h-4 w-4 mr-2" />
              Új terv
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Új táplálkozási terv</DialogTitle>
              <DialogDescription>
                Hozz létre egy étrend sablont
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Terv neve</Label>
                <Input placeholder="pl. Fogyókúra - Nők" />
              </div>
              <div className="space-y-2">
                <Label>Leírás</Label>
                <Textarea placeholder="Az étrend leírása..." rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Napi kalória (kcal)</Label>
                  <Input type="number" defaultValue={2000} />
                </div>
                <div className="space-y-2">
                  <Label>Fehérje (g)</Label>
                  <Input type="number" defaultValue={150} />
                </div>
                <div className="space-y-2">
                  <Label>Szénhidrát (g)</Label>
                  <Input type="number" defaultValue={200} />
                </div>
                <div className="space-y-2">
                  <Label>Zsír (g)</Label>
                  <Input type="number" defaultValue={65} />
                </div>
              </div>
              <Button
                onClick={() => {
                  setDialogOpen(false);
                  toast.success("Táplálkozási terv létrehozva!");
                }}
                className="w-full bg-lime text-zinc-900 hover:bg-lime-dark font-semibold"
              >
                Létrehozás
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className="border-zinc-200 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg font-semibold text-zinc-900">
                  {plan.name}
                </CardTitle>
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
                {plan.description}
              </p>

              <div className="flex items-center gap-2">
                <Badge className="bg-lime/10 text-lime-dark border-lime/20">
                  <Flame className="h-3 w-3 mr-1" />
                  {plan.dailyCalories} kcal
                </Badge>
                <Badge variant="outline" className="text-zinc-500">
                  <Users className="h-3 w-3 mr-1" />
                  {plan.assignedClients} ügyfél
                </Badge>
              </div>

              <div className="space-y-2">
                <MacroBar label="Fehérje" value={plan.proteinG} max={250} color="[&>div]:bg-red-400" icon={Beef} />
                <MacroBar label="Szénhidrát" value={plan.carbsG} max={400} color="[&>div]:bg-yellow-400" icon={Wheat} />
                <MacroBar label="Zsír" value={plan.fatG} max={120} color="[&>div]:bg-blue-400" icon={Droplets} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

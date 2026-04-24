"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Flame,
  Beef,
  Wheat,
  Droplets,
  Plus,
  Clock,
  CheckCircle2,
  UtensilsCrossed,
} from "lucide-react";

const macroTargets = {
  calories: { target: 1600, consumed: 1180, unit: "kcal" },
  protein: { target: 130, consumed: 98, unit: "g" },
  carbs: { target: 140, consumed: 105, unit: "g" },
  fat: { target: 55, consumed: 38, unit: "g" },
};

const meals = [
  {
    name: "Reggeli",
    time: "07:00",
    completed: true,
    calories: 380,
    foods: [
      { name: "Zabkása tejjel", amount: "60g zab + 200ml tej", cal: 280 },
      { name: "Banán", amount: "1 db", cal: 100 },
    ],
  },
  {
    name: "Tízórai",
    time: "10:00",
    completed: true,
    calories: 200,
    foods: [
      { name: "Görög joghurt", amount: "150g", cal: 130 },
      { name: "Dió", amount: "15g", cal: 70 },
    ],
  },
  {
    name: "Ebéd",
    time: "13:00",
    completed: true,
    calories: 450,
    foods: [
      { name: "Grillezett csirkemell", amount: "150g", cal: 230 },
      { name: "Barna rizs", amount: "80g (száraz)", cal: 130 },
      { name: "Vegyes saláta", amount: "150g", cal: 40 },
      { name: "Olívaolaj", amount: "1 tk", cal: 50 },
    ],
  },
  {
    name: "Uzsonna",
    time: "16:00",
    completed: false,
    calories: 150,
    foods: [
      { name: "Alma", amount: "1 db", cal: 70 },
      { name: "Mandula", amount: "10g", cal: 60 },
      { name: "Rizstejszelet", amount: "1 db", cal: 20 },
    ],
  },
  {
    name: "Vacsora",
    time: "19:00",
    completed: false,
    calories: 420,
    foods: [
      { name: "Lazacfilé", amount: "150g", cal: 280 },
      { name: "Sült édesburgonya", amount: "150g", cal: 100 },
      { name: "Brokkoli", amount: "100g", cal: 30 },
      { name: "Citromlé", amount: "1 ek", cal: 10 },
    ],
  },
];

function MacroCircle({
  label,
  consumed,
  target,
  unit,
  color,
  icon: Icon,
}: {
  label: string;
  consumed: number;
  target: number;
  unit: string;
  color: string;
  icon: React.ElementType;
}) {
  const percent = Math.min(Math.round((consumed / target) * 100), 100);

  return (
    <Card className="border-zinc-200">
      <CardContent className="pt-5 text-center space-y-3">
        <div className="mx-auto w-20 h-20 rounded-full border-4 border-zinc-100 relative flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" strokeWidth="4" className="text-zinc-100" />
            <circle
              cx="40"
              cy="40"
              r="36"
              fill="none"
              stroke={color}
              strokeWidth="4"
              strokeDasharray={`${(percent / 100) * 226} 226`}
              strokeLinecap="round"
            />
          </svg>
          <span className="text-sm font-bold text-zinc-900">{percent}%</span>
        </div>
        <div>
          <div className="flex items-center justify-center gap-1 text-xs text-zinc-500">
            <Icon className="h-3 w-3" />
            {label}
          </div>
          <p className="text-sm font-semibold text-zinc-900 mt-0.5">
            {consumed} / {target} {unit}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function NutritionPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl tracking-tight text-zinc-900">
          Étrendem
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Mai nap tervezett étkezései és makrónutriens céljai
        </p>
      </div>

      {/* Macro Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MacroCircle label="Kalória" consumed={macroTargets.calories.consumed} target={macroTargets.calories.target} unit="kcal" color="#bde800" icon={Flame} />
        <MacroCircle label="Fehérje" consumed={macroTargets.protein.consumed} target={macroTargets.protein.target} unit="g" color="#ef4444" icon={Beef} />
        <MacroCircle label="Szénhidrát" consumed={macroTargets.carbs.consumed} target={macroTargets.carbs.target} unit="g" color="#eab308" icon={Wheat} />
        <MacroCircle label="Zsír" consumed={macroTargets.fat.consumed} target={macroTargets.fat.target} unit="g" color="#3b82f6" icon={Droplets} />
      </div>

      {/* Daily Remaining */}
      <Card className="border-zinc-200 bg-lime/5">
        <CardContent className="pt-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-900">Hátralévő kalória ma</p>
            <p className="text-2xl font-bold text-lime-dark">
              {macroTargets.calories.target - macroTargets.calories.consumed} kcal
            </p>
          </div>
          <Progress
            value={(macroTargets.calories.consumed / macroTargets.calories.target) * 100}
            className="w-48 h-3 [&>div]:bg-lime"
          />
        </CardContent>
      </Card>

      {/* Meals */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900">Mai étkezések</h2>
        {meals.map((meal) => (
          <Card key={meal.name} className={`border-zinc-200 ${meal.completed ? "bg-white" : "bg-zinc-50/50"}`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${meal.completed ? "bg-lime/10" : "bg-zinc-100"}`}>
                    {meal.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-lime" />
                    ) : (
                      <UtensilsCrossed className="h-5 w-5 text-zinc-400" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-zinc-900">
                      {meal.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <Clock className="h-3 w-3" />
                      {meal.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="bg-zinc-50">
                    <Flame className="h-3 w-3 mr-1" />
                    {meal.calories} kcal
                  </Badge>
                  {!meal.completed && (
                    <Button size="sm" variant="outline" className="text-xs">
                      <Plus className="h-3 w-3 mr-1" />
                      Logolás
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1.5 ml-13">
                {meal.foods.map((food, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime/60" />
                      <span className="text-zinc-700">{food.name}</span>
                      <span className="text-xs text-zinc-400">{food.amount}</span>
                    </div>
                    <span className="text-xs text-zinc-500">{food.cal} kcal</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

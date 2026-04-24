"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dumbbell,
  Play,
  CheckCircle2,
  Clock,
  Trophy,
} from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  completed: boolean;
  loggedWeight: string;
  loggedReps: string;
}

const initialExercises: Exercise[] = [
  { id: "1", name: "Guggolás", sets: 4, reps: "10", rest: "90mp", completed: false, loggedWeight: "", loggedReps: "" },
  { id: "2", name: "Fekvenyomás", sets: 4, reps: "8", rest: "120mp", completed: false, loggedWeight: "", loggedReps: "" },
  { id: "3", name: "Húzódzkodás", sets: 3, reps: "Max", rest: "90mp", completed: false, loggedWeight: "", loggedReps: "" },
  { id: "4", name: "Váll tolás (kettlebell)", sets: 3, reps: "12", rest: "60mp", completed: false, loggedWeight: "", loggedReps: "" },
  { id: "5", name: "Evezés egykezes súlyzóval", sets: 3, reps: "12/oldal", rest: "60mp", completed: false, loggedWeight: "", loggedReps: "" },
  { id: "6", name: "Plank", sets: 3, reps: "45mp", rest: "30mp", completed: false, loggedWeight: "", loggedReps: "" },
];

const weekSchedule = [
  { day: "Hétfő", type: "Felsőtest A", done: true },
  { day: "Kedd", type: "Pihenőnap", done: false },
  { day: "Szerda", type: "Alsótest A", done: false },
  { day: "Csütörtök", type: "Pihenőnap", done: false },
  { day: "Péntek", type: "Teljes test", done: false },
  { day: "Szombat", type: "Cardio (opcionális)", done: false },
  { day: "Vasárnap", type: "Pihenőnap", done: false },
];

export default function MyPlanPage() {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);

  const toggleExercise = (id: string) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === id ? { ...ex, completed: !ex.completed } : ex
      )
    );
  };

  const updateWeight = (id: string, value: string) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === id ? { ...ex, loggedWeight: value } : ex
      )
    );
  };

  const updateReps = (id: string, value: string) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.id === id ? { ...ex, loggedReps: value } : ex
      )
    );
  };

  const completedCount = exercises.filter((e) => e.completed).length;
  const progressPercent = Math.round((completedCount / exercises.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-4xl space-y-6"
    >
      <div>
        <h1 className="font-heading text-2xl font-bold lg:text-3xl">
          Edzéstervem
        </h1>
        <p className="mt-1 text-muted-foreground">
          Kövesd a terved és rögzítsd az eredményeid
        </p>
      </div>

      {/* Program Overview */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">12 Hetes Fogyás Program</h2>
              <p className="text-sm text-muted-foreground">
                Heti 3 edzés + opcionális cardio
              </p>
            </div>
          </div>
          <div className="w-full max-w-xs space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Haladás</span>
              <span className="font-semibold">4. hét / 12 hét</span>
            </div>
            <Progress value={33} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Weekly Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Heti beosztás</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weekSchedule.map((d) => (
              <div
                key={d.day}
                className={`flex flex-col items-center rounded-lg p-2 text-center ${
                  d.day === "Szerda"
                    ? "bg-lime/20 ring-2 ring-lime"
                    : d.done
                    ? "bg-lime/10"
                    : "bg-muted/50"
                }`}
              >
                <span className="text-xs font-semibold">{d.day.slice(0, 2)}</span>
                <span className="mt-1 text-[10px] text-muted-foreground leading-tight">
                  {d.type}
                </span>
                {d.done && (
                  <CheckCircle2 className="mt-1 h-3.5 w-3.5 text-lime-dark" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Workout */}
      <Card className="border-2 border-lime">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <Badge className="mb-2 bg-lime text-foreground hover:bg-lime">
                Ma
              </Badge>
              <CardTitle>Alsótest A - Szerda</CardTitle>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <p>{completedCount}/{exercises.length} gyakorlat kész</p>
              <p className="font-semibold text-foreground">{progressPercent}%</p>
            </div>
          </div>
          <Progress value={progressPercent} className="h-2 mt-2" />
        </CardHeader>
        <CardContent className="space-y-3">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className={`rounded-lg border p-4 transition-all ${
                exercise.completed ? "border-lime bg-lime/5" : "border-border"
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={exercise.completed}
                  onCheckedChange={() => toggleExercise(exercise.id)}
                  className="mt-1 data-[state=checked]:bg-lime data-[state=checked]:border-lime"
                />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p
                        className={`font-semibold ${
                          exercise.completed ? "line-through text-muted-foreground" : ""
                        }`}
                      >
                        {exercise.name}
                      </p>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Dumbbell className="h-3 w-3" />
                          {exercise.sets} x {exercise.reps}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {exercise.rest} pihenő
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-lime-dark hover:text-lime-dark"
                    >
                      <Play className="mr-1 h-3 w-3" />
                      Videó
                    </Button>
                  </div>

                  {/* Log inputs */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <label className="text-xs text-muted-foreground whitespace-nowrap">
                        Súly (kg):
                      </label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={exercise.loggedWeight}
                        onChange={(e) =>
                          updateWeight(exercise.id, e.target.value)
                        }
                        className="h-8 w-20 text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <label className="text-xs text-muted-foreground whitespace-nowrap">
                        Ism.:
                      </label>
                      <Input
                        type="text"
                        placeholder="0"
                        value={exercise.loggedReps}
                        onChange={(e) =>
                          updateReps(exercise.id, e.target.value)
                        }
                        className="h-8 w-20 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button className="w-full bg-lime text-foreground hover:bg-lime-dark mt-4">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Edzés befejezése
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

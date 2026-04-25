import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { measurements, personalRecords, exercises } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { ProgressClient } from "./progress-client";

export default async function ProgressPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const userMeasurements = await db
    .select()
    .from(measurements)
    .where(eq(measurements.clientId, userId))
    .orderBy(desc(measurements.date))
    .limit(20);

  const userPRs = await db
    .select({
      id: personalRecords.id,
      weight: personalRecords.weight,
      reps: personalRecords.reps,
      achievedAt: personalRecords.date,
      exerciseName: exercises.name,
    })
    .from(personalRecords)
    .leftJoin(exercises, eq(personalRecords.exerciseId, exercises.id))
    .where(eq(personalRecords.clientId, userId))
    .orderBy(desc(personalRecords.date))
    .limit(20);

  const serializedMeasurements = userMeasurements.map((m) => ({
    id: m.id,
    date: m.date,
    weight: m.weight,
    bodyFat: m.bodyFatPercentage,
    chest: m.chest,
    waist: m.waist,
    hips: m.hips,
    biceps: m.leftArm,
    thigh: m.leftThigh,
  }));

  const serializedPRs = userPRs.map((pr) => ({
    id: pr.id,
    exerciseName: pr.exerciseName || "Ismeretlen gyakorlat",
    weight: pr.weight,
    reps: pr.reps,
    achievedAt: pr.achievedAt || "",
  }));

  return (
    <ProgressClient
      measurements={serializedMeasurements}
      personalRecords={serializedPRs}
    />
  );
}

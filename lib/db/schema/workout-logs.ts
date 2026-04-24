import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  real,
  jsonb,
  date,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { exercises } from "./programs";

export type SetLog = {
  setNumber: number;
  reps: number;
  weight: number; // kg
  rpe?: number; // Rate of Perceived Exertion 1-10
  isWarmup?: boolean;
  notes?: string;
};

export const workoutLogs = pgTable(
  "workout_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clientId: uuid("client_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    duration: integer("duration"), // minutes
    notes: text("notes"),
    rating: integer("rating"), // 1-5 overall workout rating
    mood: text("mood"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    index("workout_logs_client_id_idx").on(table.clientId),
    index("workout_logs_date_idx").on(table.date),
  ]
);

export const exerciseLogs = pgTable(
  "exercise_logs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    workoutLogId: uuid("workout_log_id")
      .notNull()
      .references(() => workoutLogs.id, { onDelete: "cascade" }),
    exerciseId: uuid("exercise_id")
      .notNull()
      .references(() => exercises.id, { onDelete: "cascade" }),
    orderIndex: integer("order_index").notNull(),
    sets: jsonb("sets").$type<SetLog[]>().notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    index("exercise_logs_workout_log_id_idx").on(table.workoutLogId),
    index("exercise_logs_exercise_id_idx").on(table.exerciseId),
  ]
);

export const measurements = pgTable(
  "measurements",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clientId: uuid("client_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    weight: real("weight"), // kg
    bodyFatPercentage: real("body_fat_percentage"),
    chest: real("chest"), // cm
    waist: real("waist"),
    hips: real("hips"),
    leftArm: real("left_arm"),
    rightArm: real("right_arm"),
    leftThigh: real("left_thigh"),
    rightThigh: real("right_thigh"),
    leftCalf: real("left_calf"),
    rightCalf: real("right_calf"),
    neck: real("neck"),
    shoulders: real("shoulders"),
    notes: text("notes"),
    photos: jsonb("photos").$type<string[]>(), // URLs
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    index("measurements_client_id_idx").on(table.clientId),
    index("measurements_date_idx").on(table.date),
  ]
);

export const personalRecords = pgTable(
  "personal_records",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clientId: uuid("client_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    exerciseId: uuid("exercise_id")
      .notNull()
      .references(() => exercises.id, { onDelete: "cascade" }),
    weight: real("weight").notNull(), // kg
    reps: integer("reps").notNull(),
    date: date("date").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    index("personal_records_client_id_idx").on(table.clientId),
    index("personal_records_exercise_id_idx").on(table.exerciseId),
  ]
);

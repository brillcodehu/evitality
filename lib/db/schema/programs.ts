import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const difficultyEnum = pgEnum("difficulty", [
  "beginner",
  "intermediate",
  "advanced",
]);

export const muscleGroupEnum = pgEnum("muscle_group", [
  "chest",
  "back",
  "shoulders",
  "biceps",
  "triceps",
  "forearms",
  "core",
  "quadriceps",
  "hamstrings",
  "glutes",
  "calves",
  "full_body",
  "cardio",
]);

export const programs = pgTable(
  "programs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    trainerId: uuid("trainer_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    difficulty: difficultyEnum("difficulty").default("beginner").notNull(),
    durationWeeks: integer("duration_weeks"),
    sessionsPerWeek: integer("sessions_per_week"),
    isTemplate: boolean("is_template").default(false).notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    tags: jsonb("tags").$type<string[]>(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [index("programs_trainer_id_idx").on(table.trainerId)]
);

export const exercises = pgTable(
  "exercises",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    description: text("description"),
    muscleGroup: muscleGroupEnum("muscle_group").notNull(),
    equipment: text("equipment"),
    videoUrl: text("video_url"),
    imageUrl: text("image_url"),
    instructions: text("instructions"),
    difficulty: difficultyEnum("difficulty").default("beginner").notNull(),
    isCustom: boolean("is_custom").default(false).notNull(),
    createdBy: uuid("created_by").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    index("exercises_muscle_group_idx").on(table.muscleGroup),
    index("exercises_created_by_idx").on(table.createdBy),
  ]
);

export const programExercises = pgTable(
  "program_exercises",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    programId: uuid("program_id")
      .notNull()
      .references(() => programs.id, { onDelete: "cascade" }),
    exerciseId: uuid("exercise_id")
      .notNull()
      .references(() => exercises.id, { onDelete: "cascade" }),
    dayNumber: integer("day_number").notNull(), // which day in the program
    orderIndex: integer("order_index").notNull(), // exercise order within the day
    sets: integer("sets"),
    reps: text("reps"), // "8-12" or "to failure"
    restSeconds: integer("rest_seconds"),
    tempo: text("tempo"), // "3-1-2-0"
    notes: text("notes"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    index("program_exercises_program_id_idx").on(table.programId),
    index("program_exercises_exercise_id_idx").on(table.exerciseId),
  ]
);

export const clientPrograms = pgTable(
  "client_programs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clientId: uuid("client_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    programId: uuid("program_id")
      .notNull()
      .references(() => programs.id, { onDelete: "cascade" }),
    startDate: timestamp("start_date", { mode: "date" }),
    endDate: timestamp("end_date", { mode: "date" }),
    isActive: boolean("is_active").default(true).notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    index("client_programs_client_id_idx").on(table.clientId),
    index("client_programs_program_id_idx").on(table.programId),
  ]
);

import {
  pgTable,
  text,
  timestamp,
  uuid,
  jsonb,
  real,
  integer,
  boolean,
  date,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const clientProfiles = pgTable(
  "client_profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: "cascade" }),
    dateOfBirth: date("date_of_birth"),
    gender: text("gender"),
    height: real("height"), // cm
    weight: real("weight"), // kg
    fitnessGoals: jsonb("fitness_goals").$type<string[]>(),
    fitnessLevel: text("fitness_level"), // beginner, intermediate, advanced
    healthConditions: jsonb("health_conditions").$type<string[]>(),
    injuries: text("injuries"),
    medications: text("medications"),
    // PAR-Q (Physical Activity Readiness Questionnaire)
    parqCompleted: boolean("parq_completed").default(false).notNull(),
    parqDate: timestamp("parq_date", { mode: "date" }),
    parqData: jsonb("parq_data").$type<Record<string, boolean | string>>(),
    // Emergency contact
    emergencyContactName: text("emergency_contact_name"),
    emergencyContactPhone: text("emergency_contact_phone"),
    emergencyContactRelation: text("emergency_contact_relation"),
    // Preferences
    preferredTrainingDays: jsonb("preferred_training_days").$type<string[]>(),
    preferredTimeSlot: text("preferred_time_slot"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [index("client_profiles_user_id_idx").on(table.userId)]
);

import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export type Macros = {
  calories: number;
  protein: number; // grams
  carbs: number;
  fat: number;
  fiber?: number;
};

export const nutritionPlans = pgTable(
  "nutrition_plans",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clientId: uuid("client_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    trainerId: uuid("trainer_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    description: text("description"),
    dailyCalories: integer("daily_calories"),
    macros: jsonb("macros").$type<Macros>(),
    dietaryRestrictions: jsonb("dietary_restrictions").$type<string[]>(),
    supplements: jsonb("supplements").$type<string[]>(),
    waterIntakeMl: integer("water_intake_ml"),
    isActive: boolean("is_active").default(true).notNull(),
    startDate: timestamp("start_date", { mode: "date" }),
    endDate: timestamp("end_date", { mode: "date" }),
    notes: text("notes"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    index("nutrition_plans_client_id_idx").on(table.clientId),
    index("nutrition_plans_trainer_id_idx").on(table.trainerId),
  ]
);

export const meals = pgTable(
  "meals",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    planId: uuid("plan_id")
      .notNull()
      .references(() => nutritionPlans.id, { onDelete: "cascade" }),
    name: text("name").notNull(), // "Breakfast", "Snack 1", etc.
    timeOfDay: text("time_of_day"), // "07:00"
    description: text("description"),
    foods: jsonb("foods").$type<
      { name: string; amount: string; macros?: Macros }[]
    >(),
    macros: jsonb("macros").$type<Macros>(),
    orderIndex: integer("order_index").notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [index("meals_plan_id_idx").on(table.planId)]
);

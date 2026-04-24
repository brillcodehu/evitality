import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
  date,
  time,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const sessionTypeEnum = pgEnum("session_type", [
  "personal",
  "group",
  "online",
]);

export const availabilitySlots = pgTable(
  "availability_slots",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    trainerId: uuid("trainer_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    dayOfWeek: integer("day_of_week"), // 0=Sunday, 6=Saturday (null if specificDate is set)
    startTime: time("start_time").notNull(),
    endTime: time("end_time").notNull(),
    isRecurring: boolean("is_recurring").default(true).notNull(),
    specificDate: date("specific_date"), // for one-off slots
    maxCapacity: integer("max_capacity").default(1).notNull(),
    sessionType: sessionTypeEnum("session_type")
      .default("personal")
      .notNull(),
    location: text("location"),
    isActive: boolean("is_active").default(true).notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    index("availability_slots_trainer_id_idx").on(table.trainerId),
    index("availability_slots_day_of_week_idx").on(table.dayOfWeek),
    index("availability_slots_specific_date_idx").on(table.specificDate),
  ]
);

import {
  pgTable,
  pgEnum,
  text,
  timestamp,
  uuid,
  date,
  index,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { availabilitySlots } from "./schedule";

export const bookingStatusEnum = pgEnum("booking_status", [
  "confirmed",
  "cancelled",
  "completed",
  "noshow",
]);

export const bookings = pgTable(
  "bookings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    clientId: uuid("client_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    slotId: uuid("slot_id")
      .notNull()
      .references(() => availabilitySlots.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    status: bookingStatusEnum("status").default("confirmed").notNull(),
    cancelReason: text("cancel_reason"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    index("bookings_client_id_idx").on(table.clientId),
    index("bookings_slot_id_idx").on(table.slotId),
    index("bookings_date_idx").on(table.date),
    index("bookings_status_idx").on(table.status),
  ]
);

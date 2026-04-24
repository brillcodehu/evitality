import {
  pgTable,
  text,
  timestamp,
  uuid,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

export const siteContent = pgTable(
  "site_content",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    key: text("key").unique().notNull(),
    value: text("value"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>(),
    section: text("section"), // "hero", "about", "services", etc.
    locale: text("locale").default("hu").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
  },
  (table) => [
    index("site_content_key_idx").on(table.key),
    index("site_content_section_idx").on(table.section),
  ]
);

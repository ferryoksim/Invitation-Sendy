import { pgTable, serial, text, timestamp, boolean } from "drizzle-orm/pg-core";

export const rsvps = pgTable("rsvps", {
  id: serial().primaryKey(),
  fullName: text("full_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  attending: boolean().notNull(),
  message: text().default(""),
  createdAt: timestamp("created_at").defaultNow(),
});

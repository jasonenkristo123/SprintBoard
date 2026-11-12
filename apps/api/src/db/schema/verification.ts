import { timestamp } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const verification = pgTable("verification", {
    id: text("id").primaryKey().notNull(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull().defaultNow(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});
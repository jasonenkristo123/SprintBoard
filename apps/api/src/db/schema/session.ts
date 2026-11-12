import { text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { user } from "./users";
import { timestamp } from "drizzle-orm/pg-core";

export const session = pgTable("session", {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id").notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull().defaultNow(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow()
});
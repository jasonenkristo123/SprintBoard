import { text } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { user } from "./users";
import { varchar } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";

export const projectStatusEnum = pgEnum("project_status", [
    "active",
    "completed",
    "archived"
])


export const projects = pgTable("projects", {
    id: uuid("id").notNull().primaryKey().defaultRandom(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 120 }).notNull(),
    description: text("description"),
    category: varchar("category", { length: 50 }),
    status: projectStatusEnum("status").default("active").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
})
// src/db/schema/tasks.ts
import { pgTable, uuid, varchar, text, date, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { projects } from "./projects";

export const taskStatusEnum = pgEnum("task_status", ["todo", "in_progress", "done"]);
export const taskPriorityEnum = pgEnum("task_priority", ["low", "medium", "high"]);

export const tasks = pgTable("tasks", {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
        .notNull()
        .references(() => projects.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    status: taskStatusEnum("status").default("todo").notNull(),
    priority: taskPriorityEnum("priority").default("medium").notNull(),
    dueDate: date("due_date"),
    position: integer("position").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
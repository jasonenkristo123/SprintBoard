import { varchar } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { boolean } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";


export const user = pgTable("user", {
    id: text("id").notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    bio: text("bio"),
    profession: varchar("profession", { length: 100 }),
    timezone: varchar("timezone", { length: 60 }).default("Asia/Jakarta"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
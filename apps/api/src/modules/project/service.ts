import { and, desc, eq } from "drizzle-orm"
import { db } from "../../db"
import { projects } from "../../db/schema"
import type { CreateProjectInput, UpdateProjectInput } from "./model"


export const ProjectService = {
    async getAllByUser(userId: string) {
        return db
        .select()
        .from(projects)
        .where(eq(projects.userId, userId))
        .orderBy(desc(projects.createdAt))
    },

    async create(userId: string, data: CreateProjectInput) {
        const [created] = await db
        .insert(projects)
        .values({
            userId,
            name: data.name,
            description: data.description,
            category: data.category
        })
        .returning();

        return created;
    },

    async update(id: string, userId: string, data: UpdateProjectInput) {
        const [updated] = await db
        .update(projects)
        .set({
            ...data,
            updatedAt: new Date(),
        })
        .where(and(eq(projects.id, id), (eq(projects.userId, userId))))

        return updated ?? null;
    },

    async delete(id: string, userId: string) {
        const [deleted] = await db
        .delete(projects)
        .where(and(eq(projects.id, id), eq(projects.userId, userId)))
        .returning()

        return deleted ?? null;
    }
}
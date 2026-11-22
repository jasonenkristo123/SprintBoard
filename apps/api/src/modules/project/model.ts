import { t, type Static } from "elysia";

export const ProjectModel = {
    createBody: t.Object({
        name: t.String({ minLength: 1, maxLength: 120}),
        description: t.Optional(t.String()),
        category: t.Optional(t.String({ maxLength: 50})),
    }),

    updateBody: t.Object({
        name: t.Optional(t.String({ minLength: 1, maxLength: 120})),
        description: t.Optional(t.String()),
        category: t.Optional(t.String({ maxLength: 50})),
        status: t.Optional(
            t.Union([
                t.Literal("active"),
                t.Literal("completed"),
                t.Literal("archived")
            ])
        )
    }),

    idParams: t.Object({
        id: t.String({ format: "uuid"})
    })
}

export type CreateProjectInput = Static<typeof ProjectModel.createBody>
export type UpdateProjectInput = Static<typeof ProjectModel.updateBody>
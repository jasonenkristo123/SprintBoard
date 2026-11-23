import Elysia from "elysia";
import { betterAuthPlugin } from "../../shared/auth-middleware";
import { ProjectService } from "./service";
import { ProjectModel } from "./model";

export const projectsModule = new Elysia({ prefix: "/api/projects"})
    .use(betterAuthPlugin)
    .get("/", async({ user }) => {
        const data = await ProjectService.getAllByUser(user.id);

        return { data };
    }, {
        auth: true
    })
    .post("/", async({ user, body, set}) => {
        const created = await ProjectService.create(user.id, body);
        set.status = 201;

        return {
            message: "Project berhasil dibuat",
            data: created
        }
    }, {
        auth: true,
        body: ProjectModel.createBody
    })
    .patch("/:id", async({ user, body, params, status }) => {
        const updated = await ProjectService.update(params.id, user.id, body);

        if (!updated) return status(404, {
            message: "Project tidak ditemukan"
        })

        return {
            message: "Project diberbarui",
            data: updated
        }
    }, {
        auth: true,
        body: ProjectModel.updateBody,
        params: ProjectModel.idParams
    }) 
    .delete("/:id", async({ params, user, status }) => {
        const deleted = await ProjectService.delete(params.id, user.id);

        if (!deleted) return status(404, {
            message: "Project tidak ditemukan"
        })

        return {
            message: "Project berhasil di hapus!",
            data: deleted
        }
    }, {
        auth: true,
        params: ProjectModel.idParams
    })
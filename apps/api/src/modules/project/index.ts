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
    .put("/:id", async({ user, body, set }) => {
        const [updated] = 
    }) 
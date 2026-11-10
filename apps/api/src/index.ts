import Elysia, { t } from "elysia";
import { tasks } from "./data/test";
import cors from "@elysia/cors";


const app2 = new Elysia({ name: "api2", })
.get("/id/:id", ({ params: { id } }) => id, {
    params: t.Object({
        id: t.String(),
    })
})

const app = new Elysia({ prefix: '/api', name: "api1" })
    .use(cors())
    .use(app2)
    .get('/tasks', () => {
        return tasks;
    })
    .get('/', () => 'hello elysia')
    .listen(3001);

    console.log(
        `API is running at http://localhost:${app.server?.port}`
    );

export type APP = typeof app;
export type APP2 = typeof app2;
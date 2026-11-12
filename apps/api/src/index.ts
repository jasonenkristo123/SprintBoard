import Elysia from "elysia";
import { cors } from "@elysia/cors"
import swagger from "@elysiajs/swagger";
import { betterAuthPlugin } from "./shared/auth-middleware";

const app = new Elysia()
    .use(cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    }))
    .use(swagger({ path: "/docs" }))
    .use(betterAuthPlugin)
    .get("/api/health", () => ({
        status: "ok",
        message: "Sprintboard API is running"
    }))
    .get("/api/me", ({ user }) => user, {
        auth: true
    })
    .listen(3000)

    console.log("running")

export type APP = typeof app;

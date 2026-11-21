import { treaty } from "@elysia/eden";
import type { APP } from "../../../api/src";
import { PUBLIC_API_URL } from "$app/env/public";
import { createAuthClient } from "better-auth/svelte";

export const api = treaty<APP>(PUBLIC_API_URL, {
    fetch: {
        credentials: "include"
    }
});

export const authClient = createAuthClient({
    baseURL: PUBLIC_API_URL,
})
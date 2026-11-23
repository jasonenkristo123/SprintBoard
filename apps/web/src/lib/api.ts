import { PUBLIC_API_URL } from "$app/env/public";
import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient({
    baseURL: PUBLIC_API_URL,
})

export async function apiFetch<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const res = await fetch(`${PUBLIC_API_URL}${endpoint}`, {
        ...options,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        }
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || `Error ${res.status}`)
    }

    return result as T;
}
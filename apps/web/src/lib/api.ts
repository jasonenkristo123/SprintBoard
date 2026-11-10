import { treaty } from "@elysia/eden";
import type { APP } from "../../../api/src";
import { PUBLIC_API_URL } from "$app/env/public";

export const api = treaty<APP>(PUBLIC_API_URL);
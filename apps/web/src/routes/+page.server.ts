import { api } from '#lib/api.ts'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
    const { data: tasks } = await api.api.tasks.get();

    return {
        tasks: tasks ?? []
    }
} 
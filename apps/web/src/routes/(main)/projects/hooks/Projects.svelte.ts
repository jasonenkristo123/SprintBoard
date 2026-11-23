import { apiFetch } from "#lib/api.ts";
import type { Project, StatusFilter } from "../types/ProjectType";

export class ProjectsStore {
 projects = $state<Project[]>([]);
 searchQuery = $state("");
 activeFilter = $state<StatusFilter>("all");
 loading = $state(false);

 counts = $derived({
    all: this.projects.length,
    active: this.projects.filter((p) => p.status === "active").length,
    completed: this.projects.filter((p) => p.status === "completed").length,
});

 filterTabs = $derived([
    {
        value: "all" as const,
        label: "Semua",
        count: this.counts.all,
    },
    {
        value: "active" as const,
        label: "Sedang Berjalan",
        count: this.counts.active,
    },
    {
        value: "completed" as const,
        label: "Selesai",
        count: this.counts.completed,
    },
]);

 filteredProjects = $derived(
    this.projects.filter((project) => {
        const matchStatus =
            this.activeFilter === "all" || project.status === this.activeFilter;
        const matchSearch = project.name
            .toLowerCase()
            .includes(this.searchQuery.trim().toLowerCase());

        return matchStatus && matchSearch;
    }),
);

async loadProjects() {
    try {
        this.loading = true;

        const res = await apiFetch<{ data: Project[] }>("/api/projects");
        this.projects = res.data;
    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
    } finally {
        this.loading = false;
    }
}
}
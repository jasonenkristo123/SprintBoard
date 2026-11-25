import { apiFetch } from "#lib/api.ts";
import type { CreateProjectInput, DeleteProjectInput, Project, StatusFilter, UpdateProjectInput } from "../types/ProjectType";

export class ProjectsStore {
    projects = $state<Project[]>([]);
    searchQuery = $state("");
    activeFilter = $state<StatusFilter>("all");
    loading = $state(false);
    submitting = $state(false);
    errorMsg = $state("");
    isCreateModalOpen = $state(false);
    isUpdateModalOpen = $state(false);
    isDeleteModalOpen = $state(false);

    selectedProject = $state<Project | null>(null);

    openUpdateModal(project: Project) {
        this.errorMsg = "";
        this.selectedProject = project;
        this.isUpdateModalOpen = true;
    }

    closeUpdateModal() {
        this.isUpdateModalOpen = false;
        this.selectedProject = null;
    }

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

    openCreateModal() {
        this.errorMsg = "";
        this.isCreateModalOpen = true;
    }

    closeCreateModal() {
        this.isCreateModalOpen = false;
    }

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

    async createProject(data: CreateProjectInput): Promise<boolean> {
        try {
            this.submitting = true;
            this.errorMsg = "";

            const res = await apiFetch<{ message: string; data: Project }>("/api/projects", {
                method: "POST",
                body: JSON.stringify(data),
            });

            this.projects = [res.data, ...this.projects];

            return true;
        } catch (error) {
            this.errorMsg = error instanceof Error ? error.message : "Gagal membuat proyek"
            return false;
        } finally {
            this.submitting = false;
        }
    }

    async updateProject(data: UpdateProjectInput): Promise<boolean> {
        try {
            this.submitting = true;
            this.errorMsg = "";

            const res = await apiFetch<{ message: string; data: Project }>(`/api/projects/${data.id}`, {
                method: "PATCH",
                body: JSON.stringify({
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    status: data.status
                })
            });

            this.projects = this.projects.map((p) => (p.id === data.id ? res.data : p));

            return true;
        } catch (error) {
            this.errorMsg = error instanceof Error ? error.message : "Gagal memperbarui proyek";
            return false;
        } finally {
            this.submitting = false;
        }
    }

    async deleteProject(data: DeleteProjectInput): Promise<boolean> {
        try {
            this.submitting = true;
            this.errorMsg = "";

            const res = await apiFetch<{message:string}>(`/api/projects/${data.id}`, {
                method: "DELETE"
            });

            if (res) {
                this.projects = this.projects.filter((p) => p.id !== data.id);
            }

            return true;
        } catch (error) {
            this.errorMsg = error instanceof Error ? error.message : "Gagal menghapus proyek";
            return false;
        } finally {
            this.submitting = false;
        }
    }


}
<script lang="ts">
  import { onMount } from "svelte";
  import type { ProjectsStore } from "../hooks/Projects.svelte";
  import type { Project } from "../types/ProjectType";
  import {
    ArrowRight,
    EllipsisVertical,
    FolderKanban,
    Plus,
  } from "@lucide/svelte";

  let { store }: { store: ProjectsStore } = $props();

  const statusMeta: Record<
    Project["status"],
    { label: string; badgeClass: string; dotClass: string }
  > = {
    active: {
      label: "Sedang Berjalan",
      badgeClass: "bg-blue-50 text-blue-700",
      dotClass: "bg-blue-500",
    },
    completed: {
      label: "Selesai",
      badgeClass: "bg-emerald-50 text-emerald-700",
      dotClass: "bg-emerald-500",
    },
    archived: {
      label: "Diarsipkan",
      badgeClass: "bg-gray-100 text-gray-600",
      dotClass: "bg-gray-400",
    },
  };

  onMount(async () => {
    await store.loadProjects();
  });
</script>

<div class="w-full mt-6">
  {#if store.loading}
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {#each [1, 2, 3] as item (item)}
        <div
          class="bg-white border border-black/8 rounded-2xl p-5 space-y-4 animate-pulse"
        >
          <div class="flex items-center gap-2">
            <div class="h-6 w-20 rounded-full bg-gray-200"></div>
            <div class="h-6 w-28 rounded-full bg-gray-100"></div>
          </div>
          <div class="space-y-2">
            <div class="h-5 w-3/4 rounded bg-gray-200"></div>
            <div class="h-4 w-full rounded bg-gray-100"></div>
            <div class="h-4 w-2/3 rounded bg-gray-100"></div>
          </div>
          <div class="pt-3 border-t border-black/5 flex justify-between">
            <div class="h-4 w-24 rounded bg-gray-100"></div>
            <div class="h-4 w-16 rounded bg-gray-200"></div>
          </div>
        </div>
      {/each}
    </div>
  {:else if store.filteredProjects.length === 0}
    <div
      class="flex flex-col items-center justify-center text-center bg-white/80 border border-dashed border-black/15 rounded-2xl py-14 px-6"
    >
      <div
        class="w-12 h-12 rounded-2xl bg-secondary-primary text-primary-blue flex items-center justify-center mb-4"
      >
        <FolderKanban size={24} />
      </div>
      {#if store.projects.length === 0}
        <h2 class="text-base sm:text-lg font-semibold text-primary-dark">
          Belum ada proyek
        </h2>
        <p class="text-sm text-secondary-text mt-1 max-w-sm">
          Mulai buat proyek pertama Anda untuk mengatur fokus dan melacak
          progres pekerjaan.
        </p>
        <button
          type="button"
          onclick={() => store.openCreateModal()}
          class="mt-5 inline-flex items-center gap-2 bg-primary-blue hover:bg-primary-blue/90 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          <Plus size={18} />
          Proyek Baru
        </button>
      {:else}
        <h2 class="text-base sm:text-lg font-semibold text-primary-dark">
          Proyek tidak ditemukan
        </h2>
        <p class="text-sm text-secondary-text mt-1 max-w-sm">
          Coba ubah kata kunci pencarian atau pilih filter status lainnya.
        </p>
      {/if}
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {#each store.filteredProjects as project (project.id)}
        {@const status = statusMeta[project.status]}
        <article
          class="group flex flex-col justify-between bg-white border border-black/8 rounded-2xl shadow-xs hover:shadow-md hover:border-primary-blue/25 transition-all duration-200 overflow-hidden"
        >
          <div class="p-5 flex-1 flex flex-col gap-3">
            <div class="flex items-start justify-between gap-2">
              <div class="flex flex-wrap items-center gap-2">
                {#if project.category}
                  <span
                    class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-secondary-primary text-primary-blue"
                  >
                    {project.category}
                  </span>
                {/if}
                <span
                  class={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${status.badgeClass}`}
                >
                  <span class={`w-1.5 h-1.5 rounded-full ${status.dotClass}`}
                  ></span>
                  {status.label}
                </span>
              </div>

              <button
                type="button"
                aria-label="Opsi proyek"
                class="p-1.5 -mr-1.5 -mt-1 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-primary-dark transition-colors cursor-pointer shrink-0"
              >
                <EllipsisVertical size={18} />
              </button>
            </div>

            <div class="space-y-1.5">
              <h2
                class="font-semibold text-base sm:text-lg text-primary-dark group-hover:text-primary-blue transition-colors line-clamp-1"
              >
                {project.name}
              </h2>
              <p
                class="text-secondary-text text-sm leading-relaxed line-clamp-2 min-h-10"
              >
                {project.description || "Tidak ada deskripsi proyek."}
              </p>
            </div>
          </div>

          <div
            class="px-5 py-3.5 bg-gray-50/70 border-t border-black/5 flex items-center justify-between gap-2"
          >
            <span class="text-xs text-secondary-text font-medium">
              {project.category ? `Kategori ${project.category}` : "Proyek Umum"}
            </span>
            <a
              href={`/projects/${project.id}`}
              class="inline-flex items-center gap-1 text-xs font-semibold text-primary-blue hover:gap-1.5 transition-all"
            >
              Buka Proyek
              <ArrowRight size={14} />
            </a>
          </div>
        </article>
      {/each}
    </div>
  {/if}
</div>

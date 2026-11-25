<script lang="ts">
  import { X } from "@lucide/svelte";
  import type { ProjectsStore } from "../hooks/Projects.svelte";

  let { store }: { store: ProjectsStore } = $props();
  let name = $state("");
  let description = $state("");
  let category = $state("");

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const res = await store.createProject({
      name: name.trim(),
      description: description.trim(),
      category: category.trim() || null,
    });

    if (res) {
      (name = ""),
        (description = ""),
        (category = ""),
        store.closeCreateModal();
    }
  }
</script>

{#if store.isCreateModalOpen}
  <div
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
    role="presentation"
    onclick={(e) => {
      if (e.target === e.currentTarget) store.closeCreateModal();
    }}
  >
    <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-primary-dark">Proyek Baru</h2>
        <button
          type="button"
          onclick={() => store.closeCreateModal()}
          class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      <form onsubmit={handleSubmit} class="space-y-4">
        <div>
          <label for="project-name" class="block text-sm font-medium mb-1">
            Nama Proyek
          </label>
          <input
            id="project-name"
            type="text"
            bind:value={name}
            placeholder="Redesign Landing Page"
            class="w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-sm focus:border-primary-blue focus:outline-none"
            required
          />
        </div>

        <div>
          <label for="project-category" class="block text-sm font-medium mb-1">
            Kategori
          </label>
          <input
            id="project-category"
            type="text"
            bind:value={category}
            placeholder="Contoh: Engineering, Design..."
            class="w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-sm focus:border-primary-blue focus:outline-none"
          />
        </div>

        <div>
          <label for="project-desc" class="block text-sm font-medium mb-1">
            Deskripsi
          </label>
          <textarea
            id="project-desc"
            rows="3"
            bind:value={description}
            placeholder="Deskripsi singkat proyek..."
            class="w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-sm focus:border-primary-blue focus:outline-none resize-none"
          ></textarea>
        </div>

        {#if store.errorMsg}
          <p class="text-sm text-red-500">{store.errorMsg}</p>
        {/if}
        <div class="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onclick={() => store.closeCreateModal()}
            class="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={store.submitting}
            class="px-4 py-2 rounded-xl text-sm font-medium bg-primary-blue text-white hover:bg-primary-blue/90 disabled:opacity-50 cursor-pointer"
          >
            {store.submitting ? "Menyimpan..." : "Simpan Proyek"}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

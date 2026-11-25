<script lang="ts">
  import { Check, ChevronDown, X } from "@lucide/svelte";
  import type { ProjectsStore } from "../hooks/Projects.svelte";
  import type { Project } from "../types/ProjectType";

  let { store }: { store: ProjectsStore } = $props();

  let name = $state("");
  let description = $state("");
  let category = $state("");
  let status = $state<Project["status"]>("active");
  let isStatusOpen = $state(false);

  const statusOptions: {
    value: Project["status"];
    label: string;
    dotClass: string;
  }[] = [
    { value: "active", label: "Sedang Berjalan", dotClass: "bg-blue-500" },
    { value: "completed", label: "Selesai", dotClass: "bg-emerald-500" },
    { value: "archived", label: "Diarsipkan", dotClass: "bg-gray-400" },
  ];

  let selectedStatusOption = $derived(
    statusOptions.find((opt) => opt.value === status) ?? statusOptions[0],
  );

  $effect(() => {
    if (store.selectedProject) {
      name = store.selectedProject.name;
      description = store.selectedProject.description ?? "";
      category = store.selectedProject.category ?? "";
      status = store.selectedProject.status;
      isStatusOpen = false;
    }
  });

  function closeModal() {
    isStatusOpen = false;
    store.closeUpdateModal();
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (!store.selectedProject) return;

    const res = await store.updateProject({
        id: store.selectedProject.id,
        name: name.trim(),
        description: description.trim(),
        category: category.trim() || undefined,
        status: status,
    });

    if (res) {
        closeModal();
    }
  }
  
</script>

<svelte:window onclick={() => (isStatusOpen = false)} />

{#if store.isUpdateModalOpen && store.selectedProject}
  <div
    class="fixed inset-0 z-60 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-xs"
    role="presentation"
    onclick={(e) => {
      if (e.target === e.currentTarget) closeModal();
    }}
  >
    <div
      class="w-full max-w-md rounded-2xl bg-white p-5 sm:p-6 shadow-xl my-auto"
    >
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-primary-dark">Edit Proyek</h2>
        <button
          type="button"
          aria-label="Tutup modal"
          onclick={closeModal}
          class="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      <form onsubmit={handleSubmit} class="space-y-4">
        <div>
          <label
            for="edit-project-name"
            class="block text-sm font-medium text-primary-dark mb-1"
          >
            Nama Proyek
          </label>
          <input
            id="edit-project-name"
            type="text"
            bind:value={name}
            placeholder="Redesign Landing Page"
            class="w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-sm text-primary-dark placeholder:text-gray-400 transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/15 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            for="edit-project-category"
            class="block text-sm font-medium text-primary-dark mb-1"
          >
            Kategori
          </label>
          <input
            id="edit-project-category"
            type="text"
            bind:value={category}
            placeholder="Contoh: Engineering, Design..."
            class="w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-sm text-primary-dark placeholder:text-gray-400 transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/15 focus:outline-none"
          />
        </div>

        <div>
          <label
            for="edit-project-desc"
            class="block text-sm font-medium text-primary-dark mb-1"
          >
            Deskripsi
          </label>
          <textarea
            id="edit-project-desc"
            rows="3"
            bind:value={description}
            placeholder="Deskripsi singkat proyek..."
            class="w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-sm text-primary-dark placeholder:text-gray-400 transition-all focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/15 focus:outline-none resize-none"
          ></textarea>
        </div>

        <div>
          <label
            for="edit-project-status"
            class="block text-sm font-medium text-primary-dark mb-1"
          >
            Status
          </label>
          <div class="relative">
            <button
              id="edit-project-status"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isStatusOpen}
              onclick={(e) => {
                e.stopPropagation();
                isStatusOpen = !isStatusOpen;
              }}
              class={`w-full flex items-center justify-between gap-2 rounded-xl border bg-white px-3.5 py-2.5 text-sm text-primary-dark transition-all cursor-pointer ${
                isStatusOpen
                  ? "border-primary-blue ring-2 ring-primary-blue/15"
                  : "border-black/10 hover:border-black/20"
              }`}
            >
              <span class="flex items-center gap-2.5">
                <span
                  class={`w-2 h-2 rounded-full shrink-0 ${selectedStatusOption.dotClass}`}
                ></span>
                <span>{selectedStatusOption.label}</span>
              </span>
              <ChevronDown
                size={16}
                class={`text-gray-400 transition-transform duration-200 ${
                  isStatusOpen ? "rotate-180 text-primary-blue" : ""
                }`}
              />
            </button>

            {#if isStatusOpen}
              <div
                role="listbox"
                class="absolute left-0 right-0 top-full mt-1.5 z-30 rounded-xl border border-black/10 bg-white p-1.5 shadow-lg"
              >
                {#each statusOptions as opt (opt.value)}
                  <button
                    type="button"
                    role="option"
                    aria-selected={status === opt.value}
                    onclick={(e) => {
                      e.stopPropagation();
                      status = opt.value;
                      isStatusOpen = false;
                    }}
                    class={`w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer ${
                      status === opt.value
                        ? "bg-secondary-primary text-primary-blue font-medium"
                        : "text-primary-dark hover:bg-gray-50"
                    }`}
                  >
                    <span class="flex items-center gap-2.5">
                      <span class={`w-2 h-2 rounded-full shrink-0 ${opt.dotClass}`}
                      ></span>
                      <span>{opt.label}</span>
                    </span>
                    {#if status === opt.value}
                      <Check size={15} class="text-primary-blue shrink-0" />
                    {/if}
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        </div>

        {#if store.errorMsg}
          <p class="text-sm text-red-500">{store.errorMsg}</p>
        {/if}

        <div
          class="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 pt-2"
        >
          <button
            type="button"
            onclick={closeModal}
            class="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={store.submitting}
            class="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-medium bg-primary-blue text-white hover:bg-primary-blue/90 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {store.submitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

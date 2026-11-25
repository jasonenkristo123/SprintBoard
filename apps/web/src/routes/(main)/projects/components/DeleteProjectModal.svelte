<script lang="ts">
  import type { ProjectsStore } from "../hooks/Projects.svelte";

  let { store }: { store: ProjectsStore } = $props();

  async function handleDelete() {

    if (!store.selectedProjectId) return;

    const res = await store.deleteProject(store.selectedProjectId);

    if (res) {
      store.closeDeleteModal();
    }
  }
</script>

{#if store.isDeleteModalOpen}
  <div
    class="w-full inset-0 fixed bg-black/50 z-60 flex items-center justify-center overflow-y-auto backdrop-blur-xs p-6"
    role="presentation"
    onclick={(e) => {
      if (e.target === e.currentTarget) store.closeDeleteModal();
    }}
  >
    <div
      class="w-full max-w-md rounded-2xl bg-white p-5 sm:p-6 shadow-xl my-auto"
    >
      <div class="flex flex-col w-full">
        <h1 class="text-red-600 font-semibold text-base text-center">
          Apakah kamu yakin akan menghapus proyek ini?
        </h1>
        {#if store.errorMsg}
          <p class="text-sm text-red-500 text-center mt-3">{store.errorMsg}</p>
        {/if}
        <div class="flex items-center justify-center w-full gap-4 mt-8">
          <button
            onclick={() => store.closeDeleteModal()}
            class="bg-primary-background px-10 py-3 rounded-lg cursor-pointer"
          >
            Batal
          </button>
          <button
            onclick={() => handleDelete()}
            disabled={store.submitting}
            class="bg-red-600 text-gray-200 px-10 py-3 rounded-lg cursor-pointer"
          >
            {store.submitting ? "Menunggu" : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

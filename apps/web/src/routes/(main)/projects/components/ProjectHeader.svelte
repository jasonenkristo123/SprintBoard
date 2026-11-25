<script lang="ts">
  import { Plus, Search } from "@lucide/svelte";
  import type { ProjectsStore } from "../hooks/Projects.svelte";
  let { store }: {store: ProjectsStore} = $props();
</script>

<h1 class="text-xl sm:text-2xl lg:text-3xl font-semibold mt-6">Proyek Saya</h1>

<p class="text-secondary-text">
  Kelola seluruh proyek independen dan pantau laju progres Anda secara tenang
  dan terukur.
</p>

<div
  class="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mt-6"
>
  <div class="flex flex-col sm:flex-row sm:items-center gap-3 flex-1 min-w-0">
    <div
      class="group flex items-center gap-2.5 w-full sm:max-w-xs lg:max-w-sm bg-white border border-black/10 rounded-xl px-3.5 py-2.5 shadow-xs transition-all duration-200 focus-within:border-primary-blue focus-within:ring-2 focus-within:ring-primary-blue/15"
    >
      <Search
        size={18}
        class="text-gray-400 shrink-0 transition-colors group-focus-within:text-primary-blue"
      />
      <input
        type="text"
        placeholder="Cari proyek..."
        bind:value={store.searchQuery}
        class="w-full bg-transparent text-sm text-primary-dark placeholder:text-gray-400 focus:outline-none"
      />
    </div>

    <div class="flex flex-wrap items-center gap-2">
      {#each store.filterTabs as tab (tab.value)}
        <button
          type="button"
          onclick={() => (store.activeFilter = tab.value)}
          class={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
            tab.value === store.activeFilter
              ? "bg-primary-blue text-white shadow-xs"
              : "bg-secondary-primary text-primary-dark hover:bg-primary-blue/10 hover:text-primary-blue"
          }`}
        >
          <span>{tab.label}</span>
          <span
            class={`text-xs ${
              tab.value === store.activeFilter
                ? "text-white/85"
                : "text-secondary-text"
            }`}
          >
            ({tab.count})
          </span>
        </button>
      {/each}
    </div>
  </div>

  <button
    type="button"
    onclick={() => store.openCreateModal()}
    class="w-full sm:w-auto lg:w-auto inline-flex items-center justify-center gap-2 bg-primary-blue hover:bg-primary-blue/90 active:scale-[0.99] text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-xs transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap"
  >
    <Plus size={18} />
    Proyek Baru
  </button>
</div>

<script lang="ts">
  import { apiFetch } from "#lib/api.ts";
  import { Search } from "@lucide/svelte";
  import { onMount } from "svelte";
  import type { Project, StatusFilter } from "./types/ProjectType";
  import ProjectHeader from "./components/ProjectHeader.svelte";
  import { ProjectsStore } from "./hooks/Projects.svelte";

  const store = new ProjectsStore();

  onMount(() => {
    store.loadProjects();
  });
  
</script>

<section class="w-full h-full px-3 py-4">
  <ProjectHeader {store} />
</section>

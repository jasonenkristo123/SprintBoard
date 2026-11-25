<script lang="ts">
  import CreateProjectModal from "./components/CreateProjectModal.svelte";
  import ProjectContent from "./components/ProjectContent.svelte";
  import ProjectHeader from "./components/ProjectHeader.svelte";
  import { ProjectsStore } from "./hooks/Projects.svelte";

  const store = new ProjectsStore();
</script>

<section class="w-full h-full px-10 py-8 bg-primary-background">
  <ProjectHeader {store} />
  <ProjectContent {store} />
  <CreateProjectModal {store} />
</section>

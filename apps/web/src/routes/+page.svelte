<script lang="ts">
import type { PageProps } from "./$types";

  let { data }: PageProps = $props();
  
</script>

<svelte:head>
  <title>SprintBoard</title>
</svelte:head>

<main>
  <h1>SprintBoard</h1>
  <h2>Tasks</h2>

  <ul>
    {#each data.tasks as task(task.id)}
        <li>
            {task.title} - {task.status}
        </li>
    {/each}
  </ul>
</main>

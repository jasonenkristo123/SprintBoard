<script lang="ts">
  import SidebarInset from '#lib/components/ui/sidebar/sidebar-inset.svelte';
  import SidebarProvider from '#lib/components/ui/sidebar/sidebar-provider.svelte';
  import AppSidebar from '#lib/shared/components/AppSidebar.svelte';


  let { children } = $props();

</script>

<SidebarProvider>
  <AppSidebar />
  <SidebarInset>
    <main class="flex-1 overflow-y-auto p-6">
      {@render children()}
    </main>
  </SidebarInset>
</SidebarProvider>
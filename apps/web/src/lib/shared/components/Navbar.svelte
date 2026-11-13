<script lang="ts">
  import { Menu } from "@lucide/svelte";

  const navLinks = [
    {
      name: "Fitur",
      href: "/fitur",
    },
    {
      name: "Alur Kerja",
      href: "/alur",
    },
    {
      name: "Filosofi",
      href: "/filosofi",
    },
    {
      name: "Harga",
      href: "/harga",
    },
  ];

  let isMobileOpen = $state(false);

  function toggle() {
    isMobileOpen = !isMobileOpen;
  }
</script>

<nav class="w-full hidden sm:flex items-center justify-between px-10 py-4">
  <div>
    <h1 class="font-medium xl:text-2xl">SprintBoard</h1>
  </div>

  <div class="flex gap-6 xl:text-lg">
    {#each navLinks as link}
      <a
        href={link.href}
        class="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary-blue after:transition-all after:duration-300 hover:after:w-full hover:opacity-80"
        >{link.name}</a
      >
    {/each}
  </div>

  <div>
    <button
      class="bg-primary-blue px-3 py-2 rounded-lg text-white hover:cursor-pointer"
    >
      <a href="/register"> Coba Gratis </a>
    </button>
  </div>
</nav>

<nav class="w-full sm:hidden flex justify-between px-10 py-4 relative">
  <h1 class="font-medium text-xl">SprintBoard</h1>

  <button onclick={toggle} class="sm:hidden">
    <Menu />
  </button>

  {#if isMobileOpen}
    <div
      class="flex px-6 flex-col py-3 gap-3 left-0 w-full absolute top-full bg-primary-blue/20"
    >
      {#each navLinks as link}
        <div>
          <a
            href={link.href}
            class="relative inline-block text-left after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-primary-blue after:transition-all after:duration-300 hover:after:w-full hover:opacity-80 font-medium"
            >{link.name}</a
          >
        </div>
      {/each}

      <button
        class="bg-primary-blue px-3 w-full py-2 rounded-lg text-white hover:cursor-pointer"
      >
        <a href="/register"> Coba Gratis </a>
      </button>
    </div>
  {/if}
</nav>

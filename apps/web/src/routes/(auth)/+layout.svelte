<script lang="ts">
  import { page } from "$app/state";
  import { LogOut, User } from "@lucide/svelte";

  let { children } = $props();

  let isRegister = $derived(page.url.pathname.startsWith("/register"));
</script>

<section
  class="w-full min-h-screen flex items-center justify-center bg-primary-background"
>
  <div
    class="bg-white rounded-lg shadow-2xl w-full max-w-md flex flex-col mx-auto px-6 py-6"
  >
    <h1 class="text-2xl font-medium text-center">
      Selamat Datang Di SprintBoard!
    </h1>
    <p class="font-normal text-center px-4">
      Kelola proyek dan fokus harian Anda
    </p>

    <div
      class="relative bg-secondary-primary w-full grid grid-cols-2 items-center p-1 mt-4 rounded-xl"
    >
      <div
        class="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm transition-transform duration-300 ease-in-out {isRegister
          ? 'translate-x-full'
          : 'translate-x-0'}"
      ></div>

      <a
        href="/login"
        class="relative z-10 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-colors duration-300 {!isRegister
          ? 'text-black'
          : 'text-primary-blue'}"
      >
        <LogOut size={18} />
        Masuk
      </a>

      <a
        href="/register"
        class="relative z-10 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-colors duration-300 {isRegister
          ? 'text-black'
          : 'text-primary-blue'}"
      >
        <User size={18} />
        Daftar
      </a>
    </div>

    {@render children()}
  </div>
</section>
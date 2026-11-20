<script>
  import { ArrowRight, PlayCircle } from "@lucide/svelte";
</script>

<section class="w-full py-[5%]">
  <h1
    class="text-[44px] text-center text-primary-dark font-bold px-[20%] pt-[10%] leading-[120%]"
  >
    Kelola proyek personal tanpa distraksi, dalam satu kanban yang tenang.
  </h1>
  <p class="text-center text-secondary-text text-base px-[29%] pt-5">
    Bukan workspace dokumen yang rumit atau alat kolaborasi tim yang bising.
    SprintBoard dirancang khusus untuk solo developer dan freelancer yang hanya
    ingin menyelesaikan task dengan fokus.
  </p>

  <div class="mx-auto gap-4 flex items-center justify-center py-10">
    <button class="flex gap-3 bg-primary-dark px-8 py-3 text-white rounded-lg">
      <a href="/register" class="flex items-center gap-4">
        Mulai Gratis Sekarang
        <ArrowRight />
      </a>
    </button>

    <button class="flex items-center gap-2 px-5 py-3 bg-white">
      <PlayCircle />
      Lihat Demo Interaktif
    </button>
  </div>
</section>

<script>
  import { Lock, LogOut, User } from "@lucide/svelte";


</script>

<section class="w-full h-screen flex items-center justify-center bg-primary-background">
    <div class="bg-white rounded-lg shadow-2xl max-w-[30%] flex flex-col mx-auto px-6 py-6">
        <h1 class="text-2xl font-medium">
            Selamat Datang Di SprintBoard!
        </h1>
        <p class="font-normal text-center px-4">
            Kelola proyek dan fokus harian Anda secara terarah.
        </p>

        <div class="bg-secondary-primary w-full flex items-center px-1 py-1 mt-4 rounded-xl">
            <button class="text-primary-blue w-full items-center flex justify-center py-3">
                <a href="/login" class="flex items-center">
                    <LogOut />
                    Masuk
                </a>
            </button>
            <button class="bg-white w-full flex items-center justify-center py-3 rounded-xl">
                <User />
                Daftar
            </button>
        </div>

        <form action="" class="py-6 font-medium">
            <label for="email">Email</label>
            <div class="w-full border border-black/5 flex items-center gap-2 px-3 py-2 rounded-lg">
                <span class="text-lg top-0">@</span>
                <input type="text" placeholder="nama@gmail.com" class="w-full focus:outline-none py-1">
            </div>

            <label for="password">Kata Sandi</label>
            <div class="w-full border border-black/5 flex items-center gap-2 px-3 py-2 rounded-lg">
                <Lock size={20} />
                <input type="text" placeholder="nama@gmail.com" class="w-full focus:outline-none py-1">
            </div>

        </form>
    </div>

</section>
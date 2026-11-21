<script lang="ts">
  import { authClient } from "#lib/api.ts";
  import { goto } from "$app/navigation";
  import { Lock, LogOut, User } from "@lucide/svelte";
  let name = $state("");
  let email = $state("");
  let password = $state("");
  let confirmPassword = $state("");
  let errorMsg = $state("");
  let loading = $state(false);

  async function handleRegister(e: SubmitEvent) {
    e.preventDefault();
    errorMsg = "";

    if (password !== confirmPassword) {
      errorMsg = "Password did not match confirm password";
      return;
    }

    loading = true;
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      callbackURL: `${window.location.origin}/login?verified=true`,
    });

    loading = false;

    if (error) {
      errorMsg = error.message ?? "Gagal Mendaftar";
      return;
    }

    alert(
      "Registrasi berhasil! Cek email / terminal API untuk link verifikasi.",
    );
    goto("/login");
  }
</script>

<form onsubmit={handleRegister} class="py-6 space-y-4 font-medium">
  <label for="name">Nama</label>
  <div
    class="w-full border border-black/5 flex items-center gap-2 px-3 py-2 rounded-lg"
  >
    <User size={20} />
    <input
      id="name"
      type="text"
      bind:value={name}
      placeholder="Nama lengkap"
      class="w-full focus:outline-none py-1"
      required
    />
  </div>
  <label for="email">Email</label>
  <div
    class="w-full border border-black/5 flex items-center gap-2 px-3 py-2 rounded-lg"
  >
    <span class="text-lg top-0">@</span>
    <input
      type="text"
      placeholder="nama@gmail.com"
      class="w-full focus:outline-none py-1"
      bind:value={email}
    />
  </div>

  <label for="password">Password</label>
  <div
    class="w-full border border-black/5 flex items-center gap-2 px-3 py-2 rounded-lg"
  >
    <Lock size={20} />
    <input
      type="password"
      placeholder="********"
      class="w-full focus:outline-none py-1"
      bind:value={password}
    />
  </div>

  <label for="confirm-password">Confirm Password</label>
  <div
    class="w-full border border-black/5 flex items-center gap-2 px-3 py-2 rounded-lg"
  >
    <Lock size={20} />
    <input
      type="password"
      placeholder="********"
      class="w-full focus:outline-none py-1"
      bind:value={confirmPassword}
    />
  </div>

  <button
    type="submit"
    class="text-center mx-auto flex items-center justify-center text-white w-full rounded-lg py-3 cursor-pointer bg-primary-blue"
  >
    {loading ? "Loading ..." : "Register"}
  </button>
  <p class="text-red-500">{errorMsg}</p>
</form>

<script lang="ts">
  import { Lock } from "@lucide/svelte";
  import GoogleLogo from "#lib/assets/google.png";
  import { authClient } from "#lib/api.ts";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";

  let email = $state("");
  let password = $state("");
  let loading = $state(false);
  let errorMsg = $state("");

  let isVerified = $derived(page.url.searchParams.get("verified") === "true");

  async function handleLogin(e: SubmitEvent) {
    e.preventDefault();
    errorMsg = "";
    loading = true;

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    loading = false;

    if (error) {
      errorMsg = error.message ?? "Email atau password salah";
      return;
    }

    goto("/dashboard");
  }

  async function handleLoginGoogle() {
    errorMsg = "";

    try {
      const { data, error} = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/dashboard`
      });

      console.log("Google login result: ", data, error);

      if (error) {
        errorMsg = error.message ?? "Gagal login dengan Google"
      }
    } catch (error) {
      console.error("google login exception: ", error);
      errorMsg = "Tidak bisa connect ke server API";
    }
  }
</script>

<form onsubmit={handleLogin} class="py-6 space-y-4 font-medium">
  {#if isVerified}
    <div
      class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm text-center"
    >
      Email berhasil diverifikasi! Silakan login ke akun Anda.
    </div>
  {/if}
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

  <button
    type="submit"
    class="text-center mx-auto flex items-center justify-center text-white w-full rounded-lg py-3 cursor-pointer bg-primary-blue"
  >
    {loading ? "Loading..." : "Login"}
  </button>
  <button
    type="button"
    onclick={handleLoginGoogle}
    class="flex items-center gap-4 justify-center mx-auto w-full py-3 cursor-pointer bg-gray-100 rounded-lg text-gray-600"
  >
    <img src={GoogleLogo} alt="google" class="w-6 h-6 mix-blend-multiply" />
    Login Dengan Google
  </button>
  <p class="text-red-500">{errorMsg}</p>
</form>

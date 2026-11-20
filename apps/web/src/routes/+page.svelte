
<svelte:head>
  <title>SprintBoard</title>
</svelte:head> 

<script lang="ts">
  import Navbar from "#lib/shared/components/Navbar.svelte";
  import HeroSection from "../features/LandingPage/HeroSection.svelte";

</script>

<main class="w-full min-h-screen flex flex-col flex-1 bg-primary-background">
  <Navbar />
  <HeroSection />
</main>


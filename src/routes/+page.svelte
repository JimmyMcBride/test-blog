<script lang="ts">
	import { userStore } from "$lib/authStore"
</script>

<h1>
	Welcome to My SvelteKit Blog{#if $userStore}, {$userStore.username}{/if}!
</h1>
<a class="text-blue-500" href="/blog">View my blogs!</a>

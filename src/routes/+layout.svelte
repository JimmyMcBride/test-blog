<script lang="ts">
	import "../app.css"
	import { pb } from "$lib/pocketbase"
	import { userStore } from "$lib/authStore"

	export let data
	if (data) {
		userStore.set(data)
	}

	// Load from localStorage if available
	if (typeof window !== "undefined") {
		// Subscribe to PocketBase's auth store changes
		pb.authStore.onChange(() => {
			data = pb.authStore.model
			userStore.set(data)

			document.cookie = pb.authStore.exportToCookie({
				httpOnly: false,
				secure: false,
				sameSite: "Lax",
				credentials: "include",
			})
		})
	}

	const handleLogin = async () => {
		// Fetch the available auth methods, including Discord
		const authMethods = await pb.collection("users").listAuthMethods()

		// Find Discord as the auth provider
		const discordProvider = authMethods.authProviders.find((p) => p.name === "discord")

		if (discordProvider) {
			// Save codeVerifier in sessionStorage
			sessionStorage.setItem("discord_codeVerifier", discordProvider.codeVerifier)

			// Redirect the user to Discord's OAuth login page
			window.location.href = discordProvider.authUrl
		} else {
			console.error("Discord auth provider not found")
		}
	}

	const handleLogout = () => {
		pb.authStore.clear()
		userStore.set(null)
	}
</script>

<nav class="flex">
	{#if $userStore}
		<button on:click={handleLogout}>Sign Out</button>
	{:else}
		<button on:click={handleLogin}>Sign In</button>
	{/if}
</nav>

<main class="container mx-auto h-full">
	<slot />
</main>

import { writable } from "svelte/store"
import { pb } from "$lib/pocketbase"

// Create a writable store to hold the user state
export const userStore = writable(pb.authStore.model)

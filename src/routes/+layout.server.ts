import { pb } from "$lib/pocketbase"
import type { ServerLoadEvent } from "@sveltejs/kit"

export const load = async ({ request }: ServerLoadEvent) => {
  // Load authStore from cookies on the server
  pb.authStore.loadFromCookie(request.headers.get("cookie") || "")

  // Get the authenticated user
  const user = pb.authStore.isValid ? pb.authStore.model : null

  return user
}

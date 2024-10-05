// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
    interface Post {
      title: string
      slug: string
      description: string
      image?: string
      date: string
      categories: string[]
      published: boolean
    }
  }
}

interface Post {
  title: string
  slug: string
  description: string
  image?: string
  date: string
  categories: string[]
  published: boolean
}

interface BlogComment {
  name: string
  avatar: string
  content: string
  createdAt: string
}

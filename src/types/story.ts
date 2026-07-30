import type { RouteLocationRaw } from 'vue-router'

/** A single full-screen story slide. */
export type Story = {
  image: string
  title: string
  subtitle?: string
  /** Where the “view” action navigates (project/post/section). */
  to?: RouteLocationRaw
}

/** A ring on the home page — a labelled cover that opens a set of stories. */
export type StoryGroup = {
  id: string
  label: string
  cover: string
  stories: Story[]
}

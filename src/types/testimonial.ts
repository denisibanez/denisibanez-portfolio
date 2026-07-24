export type Testimonial = {
  quote: string
  full: string
  name: string
  role: string
  photo?: string
  /** LinkedIn (or other) profile — the name links here in the detail modal. */
  link?: string
}

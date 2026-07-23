const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const parse = (value: string): [year: number, month: number] => {
  const [year, month] = value.split('-').map(Number)
  return [year ?? 0, month ?? 1]
}

/** Inclusive month count between two `YYYY-MM` dates (e.g. 2024-02 → 2024-09 = 8). */
export const monthsBetween = (start: string, end: string): number => {
  const [sy, sm] = parse(start)
  const [ey, em] = parse(end)
  return (ey - sy) * 12 + (em - sm) + 1
}

/** `2024-09` → `Sep 2024`. */
export const formatMonth = (value: string): string => {
  const [year, month] = parse(value)
  return `${MONTHS[month - 1]} ${year}`
}

/** `2024-02`, `2024-09` → `Feb 2024 — Sep 2024`. */
export const formatRange = (start: string, end: string): string =>
  `${formatMonth(start)} — ${formatMonth(end)}`

/** Year of a `YYYY-MM` date. */
export const yearOf = (value: string): string => String(parse(value)[0])

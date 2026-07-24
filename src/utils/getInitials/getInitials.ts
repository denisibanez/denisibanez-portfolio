/** First letters of the first two words, uppercased (e.g. "Alex Vance" → "AV"). */
export const getInitials = (name: string): string =>
  name
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

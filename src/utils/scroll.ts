// Ratio of the page already scrolled, between 0 and 1.
export function getScrollProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number,
): number {
  const scrollable = scrollHeight - clientHeight;

  if (scrollable <= 0) return 0;

  return Math.min(1, Math.max(0, scrollTop / scrollable));
}

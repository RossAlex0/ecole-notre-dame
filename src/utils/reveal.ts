const STAGGER_STEP_SECONDS = 0.08;
const MAX_STAGGERED_INDEX = 7;

// Delay of a staggered child, capped so long lists do not lag behind the scroll.
export function getStaggerDelay(index: number): number {
  const step = Math.min(Math.max(Math.floor(index), 0), MAX_STAGGERED_INDEX);

  return Math.round(step * STAGGER_STEP_SECONDS * 100) / 100;
}

// An element already visible on load is left as is, so it never flashes out.
export function isBelowViewport(element: Element, viewportHeight: number): boolean {
  return element.getBoundingClientRect().top >= viewportHeight;
}

// Attributes read by ScrollReveal and styled in globals.css.
export const REVEAL_ATTRIBUTES = {
  // The element fades in when scrolled into view.
  single: "data-reveal",
  // Each child fades in, one after the other.
  stagger: "data-reveal-stagger",
  // Set by ScrollReveal: "pending" until in view, then "shown".
  state: "data-reveal-state",
} as const;

export const REVEAL_PROPS = { [REVEAL_ATTRIBUTES.single]: "" };

export const REVEAL_STAGGER_PROPS = { [REVEAL_ATTRIBUTES.stagger]: "" };

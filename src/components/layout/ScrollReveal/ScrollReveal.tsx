"use client";

import { useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { REVEAL_ATTRIBUTES } from "@/utils/constants/reveal";
import { getStaggerDelay, isBelowViewport } from "@/utils/reveal";

const { single, stagger, state } = REVEAL_ATTRIBUTES;
const TARGETS = `[${single}], [${stagger}] > *`;

function prepare(element: HTMLElement) {
  const parent = element.parentElement;

  if (parent?.hasAttribute(stagger)) {
    const index = Array.prototype.indexOf.call(parent.children, element);
    element.style.setProperty("--reveal-delay", `${getStaggerDelay(index)}s`);
  }
  element.setAttribute(state, "pending");
}

// Fades in the marked elements below the fold as they scroll into view (mockup behavior).
export function ScrollReveal() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (!isIntersecting) return;
        target.setAttribute(state, "shown");
        observer.unobserve(target);
      });
    });

    document.querySelectorAll<HTMLElement>(TARGETS).forEach((element) => {
      if (element.hasAttribute(state) || !isBelowViewport(element, window.innerHeight)) return;
      prepare(element);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [reducedMotion]);

  return null;
}

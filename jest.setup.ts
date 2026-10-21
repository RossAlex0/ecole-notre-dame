import "@testing-library/jest-dom";
import { act } from "@testing-library/react";

// jsdom implements neither matchMedia nor IntersectionObserver.
let reducedMotion = false;

export function setReducedMotion(value: boolean) {
  reducedMotion = value;
}

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: query.includes("prefers-reduced-motion") ? reducedMotion : false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
});

type Observed = { callback: IntersectionObserverCallback; element: Element };
const observed: Observed[] = [];

class MockIntersectionObserver {
  constructor(private callback: IntersectionObserverCallback) {}
  observe(element: Element) {
    observed.push({ callback: this.callback, element });
  }
  disconnect() {
    for (let i = observed.length - 1; i >= 0; i--) {
      if (observed[i].callback === this.callback) observed.splice(i, 1);
    }
  }
  unobserve() {}
  takeRecords() {
    return [];
  }
}

Object.defineProperty(window, "IntersectionObserver", { writable: true, value: MockIntersectionObserver });

// Simulates every observed element entering the viewport.
export function triggerIntersection() {
  act(() => {
    [...observed].forEach(({ callback, element }) =>
      callback([{ isIntersecting: true, target: element } as IntersectionObserverEntry], {} as IntersectionObserver),
    );
  });
}

beforeEach(() => {
  reducedMotion = false;
  observed.length = 0;
});

import { getStaggerDelay, isBelowViewport } from "./reveal";

const elementAt = (top: number) => ({ getBoundingClientRect: () => ({ top }) }) as Element;

describe("getStaggerDelay", () => {
  describe("defaults", () => {
    it("does not delay the first child", () => {
      expect(getStaggerDelay(0)).toBe(0);
    });
  });

  describe("usage", () => {
    it("staggers the three pillar cards by 80 ms", () => {
      expect([0, 1, 2].map(getStaggerDelay)).toEqual([0, 0.08, 0.16]);
    });
  });

  describe("edge cases", () => {
    it("caps the delay from the eighth child on", () => {
      expect(getStaggerDelay(7)).toBe(0.56);
      expect(getStaggerDelay(40)).toBe(0.56);
    });

    it("treats negative and fractional indexes safely", () => {
      expect(getStaggerDelay(-3)).toBe(0);
      expect(getStaggerDelay(1.9)).toBe(0.08);
    });
  });
});

describe("isBelowViewport", () => {
  describe("defaults", () => {
    it("considers an element at the top of the page visible", () => {
      expect(isBelowViewport(elementAt(0), 800)).toBe(false);
    });
  });

  describe("usage", () => {
    it("flags a section further down the page", () => {
      expect(isBelowViewport(elementAt(1200), 800)).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("flags an element starting exactly at the bottom edge", () => {
      expect(isBelowViewport(elementAt(800), 800)).toBe(true);
    });

    it("keeps an element scrolled above the viewport as visible", () => {
      expect(isBelowViewport(elementAt(-500), 800)).toBe(false);
    });
  });
});

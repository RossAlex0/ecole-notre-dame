import { getScrollProgress } from "./scroll";

describe("getScrollProgress", () => {
  describe("defaults", () => {
    it("returns 0 at the top of the page", () => {
      expect(getScrollProgress(0, 3000, 800)).toBe(0);
    });
  });

  describe("usage", () => {
    it("returns the scrolled ratio halfway down", () => {
      expect(getScrollProgress(1100, 3000, 800)).toBe(0.5);
    });

    it("returns 1 at the bottom of the page", () => {
      expect(getScrollProgress(2200, 3000, 800)).toBe(1);
    });
  });

  describe("edge cases", () => {
    it("returns 0 when the page is shorter than the viewport (no division by zero)", () => {
      expect(getScrollProgress(0, 500, 800)).toBe(0);
    });

    it("returns 0 when the page exactly fits the viewport", () => {
      expect(getScrollProgress(0, 800, 800)).toBe(0);
    });

    it("clamps iOS overscroll beyond the bottom to 1", () => {
      expect(getScrollProgress(2400, 3000, 800)).toBe(1);
    });

    it("clamps negative overscroll at the top to 0", () => {
      expect(getScrollProgress(-60, 3000, 800)).toBe(0);
    });
  });
});

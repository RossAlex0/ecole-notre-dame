import { formatNumber } from "./format";

describe("formatNumber", () => {
  describe("defaults", () => {
    it("leaves small numbers untouched", () => {
      expect(formatNumber(6)).toBe("6");
    });
  });

  describe("usage", () => {
    it("groups thousands with a regular space like the mockup", () => {
      expect(formatNumber(3500)).toBe("3 500");
    });
  });

  describe("edge cases", () => {
    it("rounds decimals", () => {
      expect(formatNumber(1234.6)).toBe("1 235");
    });

    it("formats millions", () => {
      expect(formatNumber(1450000)).toBe("1 450 000");
    });
  });
});

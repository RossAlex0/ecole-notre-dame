import { computeDonationCost, getCollectedRatio } from "./donation";
import { formatEuros, formatMillionEuros, formatPercent } from "./format";

describe("computeDonationCost", () => {
  describe("defaults", () => {
    it("costs nothing for a zero donation", () => {
      expect(computeDonationCost(0, 0.66)).toBe(0);
    });
  });

  describe("usage", () => {
    it.each([
      [1000, 0.66, 340],
      [1000, 0.6, 400],
      [1000, 0.75, 250],
    ])("a %i € donation at %f reduction costs %i €", (amount, rate, cost) => {
      expect(computeDonationCost(amount, rate)).toBe(cost);
    });
  });

  describe("edge cases", () => {
    it("treats negative and invalid amounts as 0", () => {
      expect(computeDonationCost(-500, 0.66)).toBe(0);
      expect(computeDonationCost(Number.NaN, 0.66)).toBe(0);
    });

    it("rounds to the euro", () => {
      expect(computeDonationCost(55, 0.66)).toBe(19);
    });
  });
});

describe("getCollectedRatio", () => {
  describe("defaults", () => {
    it("is 0 when nothing is collected", () => {
      expect(getCollectedRatio(0, 1_450_000)).toBe(0);
    });
  });

  describe("usage", () => {
    it("matches the mockup campaign (85 %)", () => {
      expect(formatPercent(getCollectedRatio(1_230_000, 1_450_000))).toBe("85 %");
    });
  });

  describe("edge cases", () => {
    it("caps an over-funded campaign at 100 %", () => {
      expect(getCollectedRatio(2_000_000, 1_450_000)).toBe(1);
    });

    it("returns 0 for a missing goal (no division by zero)", () => {
      expect(getCollectedRatio(1000, 0)).toBe(0);
    });
  });
});

describe("currency formatting", () => {
  it("formats the mockup amounts", () => {
    expect(formatMillionEuros(1_230_000)).toBe("1,23 M€");
    expect(formatMillionEuros(1_450_000)).toBe("1,45 M€");
    expect(formatEuros(220_000)).toBe("220 000 €");
    expect(formatPercent(0.15)).toBe("15 %");
  });
});

import { cn } from "./cn";

describe("cn", () => {
  describe("defaults", () => {
    it("returns an empty string without arguments", () => {
      expect(cn()).toBe("");
    });
  });

  describe("usage", () => {
    it("combines a base class, a variant class and an optional className", () => {
      const className: string | undefined = "extra";

      expect(cn("button", "accent", className)).toBe("button accent extra");
    });
  });

  describe("edge cases", () => {
    it("drops every falsy value without leaving extra spaces", () => {
      expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
    });

    it("returns an empty string when every value is falsy", () => {
      expect(cn(false, null, undefined, "")).toBe("");
    });
  });
});

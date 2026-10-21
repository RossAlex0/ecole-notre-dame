import { render, screen } from "@testing-library/react";
import { Eyebrow } from "./Eyebrow";

describe("Eyebrow", () => {
  describe("defaults", () => {
    it("renders a paragraph with a decorative star and a mono label", () => {
      const { container } = render(<Eyebrow>Label</Eyebrow>);

      expect(container.querySelector("p")).toHaveClass("eyebrow");
      expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByText("Label")).toHaveClass("mono");
    });
  });

  describe("usage", () => {
    it("renders the hero motto", () => {
      render(<Eyebrow>Candor lucis aeternae</Eyebrow>);

      expect(screen.getByText("Candor lucis aeternae").tagName).toBe("SPAN");
    });
  });

  describe("edge cases", () => {
    it("merges an extra className", () => {
      const { container } = render(<Eyebrow className="extra">Label</Eyebrow>);

      expect(container.querySelector("p")).toHaveClass("eyebrow", "extra");
    });

    it("renders the star even with an empty label", () => {
      const { container } = render(<Eyebrow>{""}</Eyebrow>);

      expect(container.querySelector("svg")).toBeInTheDocument();
    });
  });
});

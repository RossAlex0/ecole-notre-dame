import { render, screen } from "@testing-library/react";
import { Brand } from "./Brand";

describe("Brand", () => {
  describe("defaults", () => {
    it("renders a non-link brand with a medium logo in the primary color", () => {
      const { container } = render(<Brand />);
      const wrapper = container.firstElementChild as HTMLElement;

      expect(wrapper.tagName).toBe("DIV");
      expect(wrapper.style.getPropertyValue("--_logo-width")).toBe("var(--logo-md)");
      expect(screen.getByText(/Collège/).style.getPropertyValue("--_color")).toBe(
        "var(--color-primary)",
      );
    });

    it("renders the logo as a decorative image", () => {
      const { container } = render(<Brand />);

      expect(container.querySelector("img")).toHaveAttribute("alt", "");
    });
  });

  describe("usage", () => {
    it("renders the header brand linking to the top of the page", () => {
      render(<Brand href="#top" />);

      expect(screen.getByRole("link", { name: "Collège Notre-Dame de l'Aurore" })).toHaveAttribute(
        "href",
        "#top",
      );
    });

    it("renders the footer brand with a large logo and custom color", () => {
      const { container } = render(<Brand size="lg" color="white" />);

      expect((container.firstElementChild as HTMLElement).style.getPropertyValue("--_logo-width")).toBe(
        "var(--logo-lg)",
      );
      expect(screen.getByText(/Collège/).style.getPropertyValue("--_color")).toBe("var(--color-white)");
    });
  });

  describe("edge cases", () => {
    it("breaks the name on each display line", () => {
      render(<Brand />);

      expect(screen.getByText(/Collège/).querySelectorAll("br")).toHaveLength(1);
    });

    it("falls back to a div when href is an empty string", () => {
      const { container } = render(<Brand href="" />);

      expect(container.firstElementChild?.tagName).toBe("DIV");
    });

    it("merges an extra className", () => {
      const { container } = render(<Brand className="extra" />);

      expect(container.firstElementChild).toHaveClass("brand", "extra");
    });
  });
});

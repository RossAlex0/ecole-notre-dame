import { render, screen } from "@testing-library/react";
import { Section } from "./Section";
import type { SectionBackground } from "./Section";

const getSection = (container: HTMLElement) => container.querySelector("section") as HTMLElement;

describe("Section", () => {
  describe("defaults", () => {
    it("renders a white section wrapping its content in a container", () => {
      const { container } = render(<Section>Content</Section>);
      const section = getSection(container);

      expect(section).toHaveClass("section", "white");
      expect(screen.getByText("Content")).toHaveClass("container");
      expect(section).not.toHaveAttribute("id");
    });
  });

  describe("usage", () => {
    it("renders the hero section on graph paper with its anchor id", () => {
      const { container } = render(
        <Section id="college" background="paper">
          Hero
        </Section>,
      );

      expect(getSection(container)).toHaveAttribute("id", "college");
      expect(getSection(container)).toHaveClass("paper");
    });

    it.each<SectionBackground>(["white", "paper", "primary"])("applies the %s background", (background) => {
      const { container } = render(<Section background={background}>x</Section>);

      expect(getSection(container)).toHaveClass(background);
    });
  });

  describe("edge cases", () => {
    it("merges an extra className without dropping the background", () => {
      const { container } = render(
        <Section background="primary" className="extra">
          x
        </Section>,
      );

      expect(getSection(container)).toHaveClass("section", "primary", "extra");
    });
  });
});

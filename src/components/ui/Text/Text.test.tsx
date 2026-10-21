import { render, screen } from "@testing-library/react";
import { Text } from "./Text";
import type { TextColor, TextSize, TextVariant } from "./Text";

const getVars = (element: HTMLElement) => ({
  size: element.style.getPropertyValue("--_size"),
  color: element.style.getPropertyValue("--_color"),
});

describe("Text", () => {
  describe("defaults", () => {
    it("renders a body paragraph with base size and text color", () => {
      render(<Text>Hello</Text>);
      const element = screen.getByText("Hello");

      expect(element.tagName).toBe("P");
      expect(element).toHaveClass("text", "body");
      expect(getVars(element)).toEqual({ size: "var(--text-base)", color: "var(--color-text)" });
    });

    it.each<[TextVariant, TextSize, TextColor]>([
      ["display", "3xl", "primary"],
      ["heading", "xl", "primary"],
      ["body", "base", "text"],
      ["mono", "xs", "primary"],
      ["hand", "xl", "accent"],
    ])("applies %s defaults (size %s, color %s)", (variant, size, color) => {
      render(<Text variant={variant}>Content</Text>);
      const element = screen.getByText("Content");

      expect(element).toHaveClass(variant);
      expect(getVars(element)).toEqual({
        size: `var(--text-${size})`,
        color: `var(--color-${color})`,
      });
    });
  });

  describe("usage", () => {
    it("renders the mockup lede: a muted large paragraph", () => {
      render(
        <Text size="lg" color="muted">
          Après neuf années à Verfeil, Notre-Dame de l&apos;Aurore accueillera ses élèves à Balma.
        </Text>,
      );
      const element = screen.getByText(/Après neuf années à Verfeil/);

      expect(element.tagName).toBe("P");
      expect(getVars(element)).toEqual({ size: "var(--text-lg)", color: "var(--color-muted)" });
    });

    it("renders a semantic heading styled as a small mono label", () => {
      render(
        <Text as="h3" variant="mono">
          Site en construction
        </Text>,
      );

      expect(
        screen.getByRole("heading", { level: 3, name: "Site en construction" }),
      ).toHaveClass("mono");
    });
  });

  describe("edge cases", () => {
    it("lets size and color override the variant defaults independently", () => {
      render(
        <Text variant="display" size="sm">
          Only size
        </Text>,
      );

      expect(getVars(screen.getByText("Only size"))).toEqual({
        size: "var(--text-sm)",
        color: "var(--color-primary)",
      });
    });

    it("keeps its own variables when nested inside another Text", () => {
      render(
        <Text as="h2" variant="display">
          Cap{" "}
          <Text as="span" variant="display" color="accent">
            Balma
          </Text>
        </Text>,
      );

      expect(getVars(screen.getByRole("heading")).color).toBe("var(--color-primary)");
      expect(getVars(screen.getByText("Balma")).color).toBe("var(--color-accent)");
    });

    it("does not let className replace the base classes", () => {
      render(<Text className="extra">Content</Text>);

      expect(screen.getByText("Content")).toHaveClass("text", "body", "extra");
    });

    it("renders an empty element without crashing", () => {
      const { container } = render(<Text>{""}</Text>);

      expect(container.querySelector("p")).toBeEmptyDOMElement();
    });
  });
});

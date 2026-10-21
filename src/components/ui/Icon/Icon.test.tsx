import { render, screen } from "@testing-library/react";
import { Icon } from "./Icon";
import { ICONS } from "./icons";
import type { IconName } from "./icons";

const renderSvg = (ui: React.ReactElement) => render(ui).container.querySelector("svg")!;

describe("Icon", () => {
  describe("defaults", () => {
    it("renders a decorative 24px outlined svg", () => {
      const svg = renderSvg(<Icon name="mail" />);

      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
      expect(svg).toHaveAttribute("aria-hidden", "true");
      expect(svg).toHaveAttribute("fill", "none");
      expect(svg).toHaveAttribute("stroke", "currentColor");
    });
  });

  describe("usage", () => {
    it("renders the filled YouTube icon of the footer", () => {
      const svg = renderSvg(<Icon name="youtube" size={22} />);

      expect(svg).toHaveAttribute("fill", "currentColor");
      expect(svg).not.toHaveAttribute("stroke");
      expect(svg).toHaveAttribute("width", "22");
    });

    it("exposes a labelled icon to assistive technologies", () => {
      render(<Icon name="menu" label="Menu" />);

      expect(screen.getByRole("img", { name: "Menu" })).not.toHaveAttribute("aria-hidden");
    });

    it.each(Object.keys(ICONS) as IconName[])("renders the %s icon content", (name) => {
      expect(renderSvg(<Icon name={name} />).childElementCount).toBeGreaterThan(0);
    });
  });

  describe("edge cases", () => {
    it("treats an empty label as decorative", () => {
      const svg = renderSvg(<Icon name="phone" label="" />);

      expect(svg).toHaveAttribute("aria-hidden", "true");
      expect(svg).not.toHaveAttribute("role");
    });

    it("applies the icon stroke width", () => {
      expect(renderSvg(<Icon name="menu" />)).toHaveAttribute("stroke-width", "2.2");
    });
  });
});

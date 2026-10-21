import { render, screen, within } from "@testing-library/react";
import { Pillars } from "./Pillars";
import { PILLARS_CONTENT } from "@/content/pillars";

describe("Pillars", () => {
  describe("defaults", () => {
    it("renders a centered section title with its highlight", () => {
      render(<Pillars content={PILLARS_CONTENT} />);
      const heading = screen.getByRole("heading", { level: 2, name: "Trois piliers pour grandir" });

      expect(heading.parentElement).toHaveClass("center");
    });
  });

  describe("usage", () => {
    it("renders the three pillars as a list of cards with title and text", () => {
      render(<Pillars content={PILLARS_CONTENT} />);
      const items = screen.getAllByRole("listitem");

      expect(items).toHaveLength(3);
      PILLARS_CONTENT.items.forEach((pillar, index) => {
        const card = within(items[index]);
        expect(card.getByRole("heading", { level: 3, name: pillar.title })).toBeInTheDocument();
        expect(card.getByText(pillar.text)).toBeInTheDocument();
      });
    });
  });

  describe("edge cases", () => {
    it("keeps the illustrative photos out of the accessibility tree", () => {
      const { container } = render(<Pillars content={PILLARS_CONTENT} />);

      expect(container.querySelectorAll("img")).toHaveLength(3);
      expect(screen.queryAllByRole("img")).toHaveLength(0);
    });

    it("renders an empty list without crashing", () => {
      render(<Pillars content={{ ...PILLARS_CONTENT, items: [] }} />);

      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });
  });
});

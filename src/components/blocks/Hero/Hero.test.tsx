import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";
import { HERO_CONTENT } from "@/content/hero";
import type { HeroContent } from "@/types/content";

describe("Hero", () => {
  describe("defaults", () => {
    it("renders the page h1 from the title lines", () => {
      render(<Hero content={HERO_CONTENT} />);

      expect(
        screen.getByRole("heading", { level: 1, name: /Collège.*Notre-Dame.*Aurore/ }),
      ).toBeInTheDocument();
    });

    it("renders the hero photo eagerly (priority, no lazy loading)", () => {
      render(<Hero content={HERO_CONTENT} />);

      expect(screen.getByRole("img", { name: HERO_CONTENT.picture.alt })).not.toHaveAttribute("loading");
    });
  });

  describe("usage", () => {
    it("renders the motto and every paragraph", () => {
      const { container } = render(<Hero content={HERO_CONTENT} />);

      expect(screen.getByText(HERO_CONTENT.motto)).toBeInTheDocument();
      const paragraphs = container.querySelectorAll("p.body");
      expect(paragraphs).toHaveLength(HERO_CONTENT.paragraphs.length);
      HERO_CONTENT.paragraphs.forEach((paragraph, index) => {
        expect(paragraphs[index].textContent).toContain(paragraph.text);
      });
    });

    it("renders both calls to action with their anchors", () => {
      render(<Hero content={HERO_CONTENT} />);
      const { filmCta, registrationCta } = HERO_CONTENT;

      expect(screen.getByRole("link", { name: filmCta.ariaLabel })).toHaveAttribute("href", filmCta.href);
      expect(screen.getByRole("link", { name: registrationCta.label })).toHaveClass("outline");
    });
  });

  describe("edge cases", () => {
    it("renders without paragraphs", () => {
      const content: HeroContent = { ...HERO_CONTENT, paragraphs: [] };
      const { container } = render(<Hero content={content} />);

      expect(container.querySelectorAll("p.body")).toHaveLength(0);
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    });

    it("falls back to the visible label when the film CTA has no aria-label", () => {
      const content: HeroContent = {
        ...HERO_CONTENT,
        filmCta: { label: "Voir le film", href: "#balma" },
      };
      render(<Hero content={content} />);

      expect(screen.getByRole("link", { name: "Voir le film" })).toBeInTheDocument();
    });
  });
});

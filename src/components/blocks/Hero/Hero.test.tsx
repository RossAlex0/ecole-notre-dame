import { fireEvent, render, screen } from "@testing-library/react";
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

      expect(screen.getByRole("button", { name: filmCta.ariaLabel })).toHaveAttribute("aria-haspopup", "dialog");
      expect(screen.getByRole("link", { name: registrationCta.label })).toHaveClass("outline");
    });

    it("welcomes visitors on the film button", () => {
      render(<Hero content={HERO_CONTENT} />);

      fireEvent.click(screen.getByRole("button", { name: /^Bienvenue à l’Aurore/ }));

      expect(screen.getByTitle(HERO_CONTENT.filmCta.video.title)).toHaveAttribute(
        "src",
        "https://www.youtube-nocookie.com/embed/s10p6rdBQQc?autoplay=1&rel=0",
      );
    });

    it("plays the entrance animation on the copy and the photo", () => {
      const { container } = render(<Hero content={HERO_CONTENT} />);

      expect(screen.getByRole("heading", { level: 1 })).toHaveClass("enter");
      expect(container.querySelectorAll("p.body.enter")).toHaveLength(HERO_CONTENT.paragraphs.length);
      expect(container.querySelector(".frame")).toHaveClass("entrance");
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
        filmCta: { label: "Voir le film", video: HERO_CONTENT.filmCta.video },
      };
      render(<Hero content={content} />);

      expect(screen.getByRole("button", { name: "Voir le film" })).toBeInTheDocument();
    });
  });
});

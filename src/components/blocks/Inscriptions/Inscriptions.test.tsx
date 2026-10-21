import { render, screen } from "@testing-library/react";
import { Inscriptions } from "./Inscriptions";
import { INSCRIPTIONS_CONTENT } from "@/content/inscriptions";
import { MAIL_LINKS } from "@/utils/constants/links";

describe("Inscriptions", () => {
  describe("defaults", () => {
    it("renders the eyebrow and the heading with its highlight", () => {
      render(<Inscriptions content={INSCRIPTIONS_CONTENT} />);

      expect(screen.getByText(INSCRIPTIONS_CONTENT.eyebrow)).toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 2, name: "Rejoignez l’aventure" })).toBeInTheDocument();
    });
  });

  describe("usage", () => {
    it("renders the bold opening sentence without a leading space", () => {
      render(<Inscriptions content={INSCRIPTIONS_CONTENT} />);
      const strong = screen.getByText(INSCRIPTIONS_CONTENT.paragraphs[0].strong!);

      expect(strong.tagName).toBe("STRONG");
      expect(strong.parentElement?.textContent).toBe(INSCRIPTIONS_CONTENT.paragraphs[0].strong);
    });

    it("links the contact button to the registration email", () => {
      render(<Inscriptions content={INSCRIPTIONS_CONTENT} />);

      expect(screen.getByRole("link", { name: "Nous contacter" })).toHaveAttribute(
        "href",
        "mailto:direction.ndda@gmail.com?subject=Inscription%202027",
      );
      expect(MAIL_LINKS.registration).toBe("mailto:direction.ndda@gmail.com?subject=Inscription%202027");
    });

    it("renders the hiking photo with its description", () => {
      render(<Inscriptions content={INSCRIPTIONS_CONTENT} />);

      expect(screen.getByRole("img", { name: INSCRIPTIONS_CONTENT.picture.alt })).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("renders without paragraphs", () => {
      const { container } = render(<Inscriptions content={{ ...INSCRIPTIONS_CONTENT, paragraphs: [] }} />);

      expect(container.querySelectorAll("p.body")).toHaveLength(0);
      expect(screen.getByRole("link", { name: "Nous contacter" })).toBeInTheDocument();
    });
  });
});

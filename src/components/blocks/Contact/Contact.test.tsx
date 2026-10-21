import { render, screen, within } from "@testing-library/react";
import { Contact } from "./Contact";
import { CONTACT_CONTENT } from "@/content/contact";
import { AGLAE_PRESIDENT, DIRECTOR } from "@/utils/constants/contact";

describe("Contact", () => {
  describe("defaults", () => {
    it("renders the heading with its highlight", () => {
      render(<Contact content={CONTACT_CONTENT} />);

      expect(screen.getByRole("heading", { level: 2, name: /Une.question.\? Parlons-en/ })).toBeInTheDocument();
    });
  });

  describe("usage", () => {
    it.each([DIRECTOR, AGLAE_PRESIDENT].map((person) => [person.name, person]))(
      "renders the %s card with photo, role, phone and email links",
      (_, person) => {
        render(<Contact content={CONTACT_CONTENT} />);
        const card = within(screen.getByRole("heading", { level: 3, name: person.name }).closest("li")!);

        expect(card.getByRole("img", { name: person.name })).toBeInTheDocument();
        expect(card.getByText(person.role)).toBeInTheDocument();
        expect(card.getByRole("link", { name: person.phone }).getAttribute("href")).toMatch(/^tel:\+33\d{9}$/);
        expect(card.getByRole("link", { name: person.email })).toHaveAttribute("href", `mailto:${person.email}`);
      },
    );
  });

  describe("edge cases", () => {
    it("renders no card for an empty list", () => {
      render(<Contact content={{ ...CONTACT_CONTENT, cards: [] }} />);

      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    it("only renders tel: and mailto: links built from the constants", () => {
      render(<Contact content={CONTACT_CONTENT} />);
      const hrefs = screen.getAllByRole("link").map((link) => link.getAttribute("href"));

      expect(hrefs).toEqual(["tel:+33675080146", "mailto:direction.ndda@gmail.com", "tel:+33663220742", "mailto:bienfaiteurs.ndda@gmail.com"]);
    });
  });
});

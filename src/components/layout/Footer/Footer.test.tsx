import { render, screen, within } from "@testing-library/react";
import { Footer } from "./Footer";
import { FOOTER_CONTENT } from "@/content/footer";
import { SCHOOL, SCHOOL_NAME } from "@/utils/constants/contact";
import { CREDITS, SOCIAL_LINKS } from "@/utils/constants/links";
import { LEGAL_LINKS } from "@/utils/constants/navigation";
import { toMailHref, toTelHref } from "@/utils/link";

describe("Footer", () => {
  describe("defaults", () => {
    it("renders the page footer landmark", () => {
      render(<Footer />);

      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });

    it("renders the brand without link and the follow texts from content", () => {
      render(<Footer />);

      expect(screen.queryByRole("link", { name: SCHOOL_NAME })).toBeNull();
      expect(screen.getByText(FOOTER_CONTENT.followLabel)).toBeInTheDocument();
      expect(screen.getByText(FOOTER_CONTENT.followTagline)).toBeInTheDocument();
    });
  });

  describe("usage", () => {
    it.each(SOCIAL_LINKS.map((link) => [link.label, link]))(
      "renders the %s link opening safely in a new tab",
      (_, link) => {
        render(<Footer />);
        const anchor = screen.getByRole("link", { name: link.label });

        expect(anchor).toHaveAttribute("href", link.href);
        expect(anchor).toHaveAttribute("target", "_blank");
        expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
      },
    );

    it("renders clickable phone and email built from the school constants", () => {
      render(<Footer />);

      expect(screen.getByRole("link", { name: SCHOOL.phone })).toHaveAttribute(
        "href",
        "tel:+33675080146",
      );
      expect(screen.getByRole("link", { name: SCHOOL.email })).toHaveAttribute(
        "href",
        "mailto:nddelaurore@gmail.com",
      );
    });
  });

  describe("edge cases", () => {
    it("groups every coordinate inside an address element", () => {
      const { container } = render(<Footer />);
      const address = within(container.querySelector("address") as HTMLElement);

      expect(address.getByText(SCHOOL.address, { exact: false })).toBeInTheDocument();
      expect(address.getByText(`· ${SCHOOL.addressNote}`)).toBeInTheDocument();
      expect(address.getAllByRole("link")).toHaveLength(2);
    });

    it("only renders links coming from the constants", () => {
      render(<Footer />);
      const expected = [
        ...SOCIAL_LINKS.map((link) => link.href),
        toTelHref(SCHOOL.phone),
        toMailHref(SCHOOL.email),
        ...LEGAL_LINKS.map((link) => link.href),
        ...CREDITS.map((credit) => credit.href),
      ];
      const rendered = screen.getAllByRole("link").map((link) => link.getAttribute("href"));

      expect(rendered.sort()).toEqual(expected.sort());
    });

    it("keeps every icon decorative", () => {
      const { container } = render(<Footer />);

      container.querySelectorAll("svg").forEach((svg) => {
        expect(svg).toHaveAttribute("aria-hidden", "true");
      });
    });
  });
});

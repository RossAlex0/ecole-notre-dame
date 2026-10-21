import { render, screen, within } from "@testing-library/react";
import { Header } from "./Header";
import { CONTACT_LINK, DONATE_LINK, HOME_HREF, NAV_LINKS } from "@/utils/constants/navigation";
import { SCHOOL_NAME } from "@/utils/constants/contact";

const getDesktopNav = () => screen.getByRole("navigation", { name: "Sections" });

describe("Header", () => {
  describe("defaults", () => {
    it("renders a banner with the brand linking to the top", () => {
      render(<Header />);

      expect(screen.getByRole("banner")).toBeInTheDocument();
      expect(screen.getByRole("link", { name: SCHOOL_NAME })).toHaveAttribute("href", HOME_HREF);
    });

    it("renders the mobile menu closed", () => {
      render(<Header />);

      expect(screen.getByRole("button", { name: "Menu" })).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("usage", () => {
    it("renders every navigation link from the constants in the desktop nav", () => {
      render(<Header />);
      const nav = within(getDesktopNav());

      NAV_LINKS.forEach((link) => {
        expect(nav.getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
      });
    });

    it("renders the small accent donate button and the contact link", () => {
      render(<Header />);
      const visibleLinks = screen.getAllByRole("link");

      expect(visibleLinks.find((link) => link.textContent === DONATE_LINK.label)).toHaveClass(
        "accent",
        "sm",
      );
      expect(
        visibleLinks.find((link) => link.getAttribute("href") === CONTACT_LINK.href),
      ).toBeDefined();
    });
  });

  describe("edge cases", () => {
    it("does not duplicate links in the visible desktop nav", () => {
      render(<Header />);

      expect(within(getDesktopNav()).getAllByRole("link")).toHaveLength(NAV_LINKS.length);
    });

    it("keeps mobile-only links out of the accessibility tree while the menu is closed", () => {
      render(<Header />);

      expect(screen.queryByRole("navigation", { name: "Menu mobile" })).toBeNull();
    });
  });
});

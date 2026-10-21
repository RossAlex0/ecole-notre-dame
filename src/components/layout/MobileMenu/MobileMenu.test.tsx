import { fireEvent, render, screen } from "@testing-library/react";
import { MobileMenu } from "./MobileMenu";
import { CONTACT_LINK, DONATE_LINK, NAV_LINKS } from "@/utils/constants/navigation";

const LINKS = [...NAV_LINKS, DONATE_LINK, CONTACT_LINK];

const getBurger = () => screen.getByRole("button", { name: "Menu" });
// Resolved through aria-controls so the burger ↔ drawer relation is checked too.
const getDrawer = () => {
  const drawer = document.getElementById(getBurger().getAttribute("aria-controls") ?? "");
  if (!drawer) throw new Error("Drawer controlled by the burger not found");
  return drawer;
};

describe("MobileMenu", () => {
  describe("defaults", () => {
    it("renders a closed menu", () => {
      render(<MobileMenu links={LINKS} />);

      expect(getBurger()).toHaveAttribute("aria-expanded", "false");
      expect(getDrawer()).not.toBeVisible();
    });

    it("links the burger to a labelled navigation drawer", () => {
      render(<MobileMenu links={LINKS} />);

      expect(getDrawer().tagName).toBe("NAV");
      expect(getDrawer()).toHaveAttribute("aria-label", "Menu mobile");
    });
  });

  describe("usage", () => {
    it("opens the drawer with every link when the burger is clicked", () => {
      render(<MobileMenu links={LINKS} />);
      fireEvent.click(getBurger());

      expect(getBurger()).toHaveAttribute("aria-expanded", "true");
      expect(getDrawer()).toBeVisible();
      LINKS.forEach((link) => {
        expect(screen.getByRole("link", { name: link.label })).toHaveAttribute("href", link.href);
      });
    });

    it("closes the drawer when a link is clicked", () => {
      render(<MobileMenu links={LINKS} />);
      fireEvent.click(getBurger());
      fireEvent.click(screen.getByRole("link", { name: "Balma 2027" }));

      expect(getDrawer()).not.toBeVisible();
    });

    it("closes the drawer with the Escape key", () => {
      render(<MobileMenu links={LINKS} />);
      fireEvent.click(getBurger());
      fireEvent.keyDown(document, { key: "Escape" });

      expect(getBurger()).toHaveAttribute("aria-expanded", "false");
    });
  });

  describe("edge cases", () => {
    it("closes when the burger is clicked twice", () => {
      render(<MobileMenu links={LINKS} />);
      fireEvent.click(getBurger());
      fireEvent.click(getBurger());

      expect(getDrawer()).not.toBeVisible();
    });

    it("ignores other keys while open", () => {
      render(<MobileMenu links={LINKS} />);
      fireEvent.click(getBurger());
      fireEvent.keyDown(document, { key: "Enter" });

      expect(getDrawer()).toBeVisible();
    });

    it("stays closed when Escape is pressed while closed", () => {
      render(<MobileMenu links={LINKS} />);
      fireEvent.keyDown(document, { key: "Escape" });

      expect(getBurger()).toHaveAttribute("aria-expanded", "false");
    });

    it("renders an empty drawer without links", () => {
      render(<MobileMenu links={[]} />);
      fireEvent.click(getBurger());

      expect(screen.queryAllByRole("link")).toHaveLength(0);
    });
  });
});

import { render, screen } from "@testing-library/react";
import { SectionHeading } from "./SectionHeading";

describe("SectionHeading", () => {
  describe("defaults", () => {
    it("renders an h2 display title without highlight or lede", () => {
      const { container } = render(<SectionHeading title="Titre" />);
      const heading = screen.getByRole("heading", { level: 2, name: "Titre" });

      expect(heading).toHaveClass("display");
      expect(heading.querySelector("span")).toBeNull();
      expect(container.querySelector("p")).toBeNull();
    });
  });

  describe("usage", () => {
    it("renders the mockup Balma heading with highlight and lede", () => {
      render(
        <SectionHeading
          title="Cap"
          highlight="Balma 2027"
          lede="Après neuf années à Verfeil, le collège accueillera ses élèves à Balma."
        />,
      );

      expect(screen.getByRole("heading", { level: 2, name: "Cap Balma 2027" })).toBeInTheDocument();
      expect(screen.getByText("Balma 2027").style.getPropertyValue("--_color")).toBe(
        "var(--color-accent)",
      );
      expect(screen.getByText(/Après neuf années/).style.getPropertyValue("--_color")).toBe(
        "var(--color-muted)",
      );
    });

    it("renders an h1 when level is 1", () => {
      render(<SectionHeading title="Collège Notre-Dame" highlight="de l'Aurore" level={1} />);

      expect(
        screen.getByRole("heading", { level: 1, name: "Collège Notre-Dame de l'Aurore" }),
      ).toBeInTheDocument();
    });
  });

  describe("tone, alignment and size", () => {
    it("uses the light tone, start alignment and 2xl size by default", () => {
      render(<SectionHeading title="Cap" highlight="Balma" />);
      const heading = screen.getByRole("heading");

      expect(heading.parentElement).toHaveClass("heading", "start");
      expect(heading.style.getPropertyValue("--_size")).toBe("var(--text-2xl)");
      expect(heading.style.getPropertyValue("--_color")).toBe("var(--color-primary)");
    });

    it("renders the dark tone used on blue sections: white title and gold highlight", () => {
      render(<SectionHeading title="Cap" highlight="Balma 2027" lede="Intro" tone="dark" />);

      expect(screen.getByRole("heading").style.getPropertyValue("--_color")).toBe("var(--color-white)");
      expect(screen.getByText("Balma 2027").style.getPropertyValue("--_color")).toBe("var(--color-gold)");
      expect(screen.getByText("Intro").style.getPropertyValue("--_color")).toBe("var(--color-white)");
    });

    it("centers the heading", () => {
      render(<SectionHeading title="Trois piliers" align="center" />);

      expect(screen.getByRole("heading").parentElement).toHaveClass("center");
    });

    it("keeps the highlight at the same size as the title on an h1", () => {
      render(<SectionHeading title="Collège" highlight="Aurore" level={1} />);

      expect(screen.getByText("Aurore").style.getPropertyValue("--_size")).toBe("var(--text-3xl)");
    });
  });

  describe("edge cases", () => {
    it("ignores an empty highlight without adding a trailing space", () => {
      render(<SectionHeading title="Titre" highlight="" />);
      const heading = screen.getByRole("heading");

      expect(heading.textContent).toBe("Titre");
      expect(heading.querySelector("span")).toBeNull();
    });

    it("ignores an empty lede", () => {
      const { container } = render(<SectionHeading title="Titre" lede="" />);

      expect(container.querySelector("p")).toBeNull();
    });

    it("keeps non-breaking spaces from the content", () => {
      render(<SectionHeading title={"Une question ?"} highlight="Parlons-en" />);

      expect(screen.getByRole("heading").textContent).toBe("Une question ? Parlons-en");
    });
  });
});

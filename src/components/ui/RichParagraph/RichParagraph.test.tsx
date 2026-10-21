import { render, screen } from "@testing-library/react";
import { RichParagraph } from "./RichParagraph";

describe("RichParagraph", () => {
  describe("defaults", () => {
    it("renders a plain body paragraph without strong part", () => {
      const { container } = render(<RichParagraph paragraph={{ text: "Texte simple." }} />);

      expect(container.querySelector("p")).toHaveTextContent("Texte simple.");
      expect(container.querySelector("strong")).toBeNull();
    });
  });

  describe("usage", () => {
    it("renders the hero third paragraph with its bold ending", () => {
      const { container } = render(
        <RichParagraph
          paragraph={{ text: "Pour une éducation intégrale :", strong: "élever l’âme." }}
          size="md"
          color="muted"
        />,
      );

      expect(screen.getByText("élever l’âme.").tagName).toBe("STRONG");
      expect(container.querySelector("p")).toHaveTextContent("Pour une éducation intégrale : élever l’âme.");
      expect((container.querySelector("p") as HTMLElement).style.getPropertyValue("--_color")).toBe(
        "var(--color-muted)",
      );
    });
  });

  describe("edge cases", () => {
    it("ignores an empty strong part", () => {
      const { container } = render(<RichParagraph paragraph={{ text: "Texte", strong: "" }} />);

      expect(container.querySelector("strong")).toBeNull();
      expect(container.querySelector("p")?.textContent).toBe("Texte");
    });
  });
});

import { render } from "@testing-library/react";
import { RichText } from "./RichText";
import type { TextSegment } from "@/types/content";

const renderSegments = (segments: TextSegment[]) =>
  render(<p>{<RichText segments={segments} />}</p>).container.querySelector("p")!;

describe("RichText", () => {
  describe("defaults", () => {
    it("renders plain strings as text", () => {
      expect(renderSegments(["Texte simple."]).innerHTML).toBe("Texte simple.");
    });
  });

  describe("usage", () => {
    it("renders the cheque sentence without adding spaces around the bold part", () => {
      const p = renderSegments(["À l'ordre d'", { strong: "AGLAE" }, ", à adresser à :"]);

      expect(p.innerHTML).toBe("À l'ordre d'<strong>AGLAE</strong>, à adresser à :");
    });

    it("renders links inside the text", () => {
      const p = renderSegments(["Écrivez-nous : ", { label: "Contactez-nous", href: "mailto:a@b.fr" }, "."]);

      expect(p.querySelector("a")).toHaveAttribute("href", "mailto:a@b.fr");
      expect(p.textContent).toBe("Écrivez-nous : Contactez-nous.");
    });
  });

  describe("edge cases", () => {
    it("renders nothing for an empty list", () => {
      expect(renderSegments([]).innerHTML).toBe("");
    });
  });
});

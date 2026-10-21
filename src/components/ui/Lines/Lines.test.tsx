import { render } from "@testing-library/react";
import { Lines } from "./Lines";

const renderLines = (lines: string[]) => render(<p>{<Lines lines={lines} />}</p>).container.querySelector("p")!;

describe("Lines", () => {
  describe("defaults", () => {
    it("renders a single line without line break", () => {
      const p = renderLines(["Collège"]);

      expect(p.textContent).toBe("Collège");
      expect(p.querySelectorAll("br")).toHaveLength(0);
    });
  });

  describe("usage", () => {
    it("renders the hero title over three lines", () => {
      const p = renderLines(["Collège", "Notre-Dame", "de l'Aurore"]);

      expect(p.querySelectorAll("br")).toHaveLength(2);
      expect(p.innerHTML).toBe("Collège<br>Notre-Dame<br>de l'Aurore");
    });
  });

  describe("edge cases", () => {
    it("renders nothing for an empty list", () => {
      expect(renderLines([]).innerHTML).toBe("");
    });

    it("keeps duplicated lines", () => {
      expect(renderLines(["A", "A"]).innerHTML).toBe("A<br>A");
    });
  });
});

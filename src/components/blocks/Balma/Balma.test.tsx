import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { setReducedMotion, triggerIntersection } from "../../../../jest.setup";
import { Balma } from "./Balma";
import { BALMA_CONTENT } from "@/content/balma";

const getDrawing = () => screen.getByRole("img", { name: BALMA_CONTENT.drawing.label });

describe("Balma", () => {
  describe("defaults", () => {
    it("renders the dark heading with its gold highlight and lede", () => {
      render(<Balma content={BALMA_CONTENT} />);

      expect(screen.getByRole("heading", { level: 2, name: "Cap Balma 2027" })).toBeInTheDocument();
      expect(screen.getByText("Balma 2027").style.getPropertyValue("--_color")).toBe("var(--color-gold)");
      expect(screen.getByText(BALMA_CONTENT.lede)).toBeInTheDocument();
    });

    it("hides the video placeholder message until play is pressed", () => {
      render(<Balma content={BALMA_CONTENT} />);

      expect(screen.getByRole("status", { hidden: true })).not.toBeVisible();
    });
  });

  describe("usage", () => {
    it("shows the placeholder message when the film button is pressed", () => {
      render(<Balma content={BALMA_CONTENT} />);
      fireEvent.click(screen.getByRole("button", { name: BALMA_CONTENT.video.playLabel }));

      expect(screen.getByRole("status")).toHaveTextContent(BALMA_CONTENT.video.placeholder);
    });

    it("counts the key figures up to their values once in view", () => {
      jest.useFakeTimers();
      render(<Balma content={BALMA_CONTENT} />);
      triggerIntersection();
      act(() => jest.advanceTimersByTime(2000));
      jest.useRealTimers();

      const items = within(screen.getByRole("list")).getAllByRole("listitem");
      expect(items.map((item) => item.querySelector("b")?.textContent)).toEqual(["3 500 m²", "6 lignes", "1 km"]);
    });

    it("draws the building once the drawing is in view", () => {
      render(<Balma content={BALMA_CONTENT} />);
      expect(getDrawing()).toHaveClass("animated");
      expect(getDrawing()).not.toHaveClass("run");

      triggerIntersection();

      expect(getDrawing()).toHaveClass("run");
      expect(within(getDrawing()).getByText(BALMA_CONTENT.drawing.caption)).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("shows final figures and a static drawing when reduced motion is requested", () => {
      setReducedMotion(true);
      render(<Balma content={BALMA_CONTENT} />);

      expect(getDrawing()).not.toHaveClass("animated");
      expect(screen.getAllByRole("listitem")[0].querySelector("b")?.textContent).toBe("3 500 m²");
    });

    it("renders without key figures", () => {
      render(<Balma content={{ ...BALMA_CONTENT, keyFigures: [] }} />);

      expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    });

    it("keeps the decorative video still image out of the accessibility tree", () => {
      const { container } = render(<Balma content={BALMA_CONTENT} />);

      expect(container.querySelector("img")).toHaveAttribute("alt", "");
    });
  });
});

import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { setReducedMotion } from "../../../../jest.setup";
import { Testimonials } from "./Testimonials";
import { TESTIMONIALS_CONTENT } from "@/content/testimonials";

const ITEMS = TESTIMONIALS_CONTENT.items;
const getDots = () => screen.getAllByRole("button", { name: /^Témoignage \d+$/ });
const currentDot = () => getDots().findIndex((dot) => dot.getAttribute("aria-current") === "true");

describe("Testimonials", () => {
  describe("defaults", () => {
    it("renders the centered heading and starts on the first testimonial", () => {
      render(<Testimonials content={TESTIMONIALS_CONTENT} />);

      expect(screen.getByRole("heading", { level: 2, name: "Ils nous font confiance" })).toBeInTheDocument();
      expect(getDots()).toHaveLength(ITEMS.length);
      expect(currentDot()).toBe(0);
    });
  });

  describe("usage", () => {
    it("renders every testimonial with its author and position", () => {
      render(<Testimonials content={TESTIMONIALS_CONTENT} />);

      ITEMS.forEach((item, i) => {
        const slide = screen.getByRole("group", { name: `${i + 1} sur ${ITEMS.length}` });
        expect(slide.textContent).toContain(item.quote);
        expect(within(slide).getByText(item.author)).toBeInTheDocument();
      });
    });

    it("navigates with the arrows, the dots and the keyboard", () => {
      render(<Testimonials content={TESTIMONIALS_CONTENT} />);

      fireEvent.click(screen.getByRole("button", { name: "Témoignage suivant" }));
      expect(currentDot()).toBe(1);

      fireEvent.click(getDots()[4]);
      expect(currentDot()).toBe(4);

      fireEvent.keyDown(screen.getByRole("region", { name: "Témoignages" }).querySelector("[tabindex]")!, {
        key: "ArrowLeft",
      });
      expect(currentDot()).toBe(3);
    });

    it("advances automatically every 7 seconds", () => {
      jest.useFakeTimers();
      render(<Testimonials content={TESTIMONIALS_CONTENT} />);

      act(() => jest.advanceTimersByTime(7000));
      expect(currentDot()).toBe(1);
      jest.useRealTimers();
    });
  });

  describe("edge cases", () => {
    it("wraps around from the first to the last testimonial", () => {
      render(<Testimonials content={TESTIMONIALS_CONTENT} />);
      fireEvent.click(screen.getByRole("button", { name: "Témoignage précédent" }));

      expect(currentDot()).toBe(ITEMS.length - 1);
    });

    it("pauses autoplay while hovered", () => {
      jest.useFakeTimers();
      render(<Testimonials content={TESTIMONIALS_CONTENT} />);
      fireEvent.mouseEnter(screen.getByRole("region", { name: "Témoignages" }));

      act(() => jest.advanceTimersByTime(14000));
      expect(currentDot()).toBe(0);
      jest.useRealTimers();
    });

    it("does not autoplay when reduced motion is requested", () => {
      jest.useFakeTimers();
      setReducedMotion(true);
      render(<Testimonials content={TESTIMONIALS_CONTENT} />);

      act(() => jest.advanceTimersByTime(14000));
      expect(currentDot()).toBe(0);
      jest.useRealTimers();
    });

    it("ignores keys other than the arrows", () => {
      render(<Testimonials content={TESTIMONIALS_CONTENT} />);
      fireEvent.keyDown(screen.getByRole("region").querySelector("[tabindex]")!, { key: "Enter" });

      expect(currentDot()).toBe(0);
    });
  });
});

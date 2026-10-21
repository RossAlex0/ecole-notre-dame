import { act, render, renderHook, screen } from "@testing-library/react";
import { setReducedMotion, triggerIntersection } from "../../jest.setup";
import { useCountUp } from "./useCountUp";
import { useInView } from "./useInView";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

function Probe() {
  const { ref, inView } = useInView<HTMLDivElement>();
  return <div ref={ref}>{inView ? "visible" : "hidden"}</div>;
}

describe("useInView", () => {
  describe("defaults", () => {
    it("starts out of view", () => {
      render(<Probe />);
      expect(screen.getByText("hidden")).toBeInTheDocument();
    });
  });

  describe("usage", () => {
    it("becomes true when the element enters the viewport", () => {
      render(<Probe />);
      triggerIntersection();
      expect(screen.getByText("visible")).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("stays true after being observed once (observer disconnected)", () => {
      render(<Probe />);
      triggerIntersection();
      triggerIntersection();
      expect(screen.getByText("visible")).toBeInTheDocument();
    });
  });
});

describe("usePrefersReducedMotion", () => {
  describe("defaults", () => {
    it("is false when the user has no motion preference", () => {
      expect(renderHook(() => usePrefersReducedMotion()).result.current).toBe(false);
    });
  });

  describe("usage", () => {
    it("is true when the user asks for reduced motion", () => {
      setReducedMotion(true);
      expect(renderHook(() => usePrefersReducedMotion()).result.current).toBe(true);
    });
  });

  describe("edge cases", () => {
    it("ignores unrelated media queries", () => {
      expect(window.matchMedia("(max-width: 960px)").matches).toBe(false);
    });
  });
});

describe("useCountUp", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  describe("defaults", () => {
    it("shows 0 before the figure is in view", () => {
      expect(renderHook(() => useCountUp(3500, false, true)).result.current).toBe(0);
    });
  });

  describe("usage", () => {
    it("counts up to the target once active", () => {
      const { result } = renderHook(() => useCountUp(3500, true, true));

      act(() => jest.advanceTimersByTime(2000));

      expect(result.current).toBe(3500);
    });
  });

  describe("edge cases", () => {
    it("returns the target immediately when animation is disabled", () => {
      expect(renderHook(() => useCountUp(3500, false, false)).result.current).toBe(3500);
    });

    it("handles a target of 0", () => {
      const { result } = renderHook(() => useCountUp(0, true, true));
      act(() => jest.advanceTimersByTime(2000));
      expect(result.current).toBe(0);
    });
  });
});

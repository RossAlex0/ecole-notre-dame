import { act, renderHook } from "@testing-library/react";
import { useScrollProgress } from "./useScrollProgress";

const setPage = ({ scrollTop = 0, scrollHeight = 3000, clientHeight = 800 }) => {
  const root = document.documentElement;
  Object.defineProperty(root, "scrollHeight", { configurable: true, value: scrollHeight });
  Object.defineProperty(root, "clientHeight", { configurable: true, value: clientHeight });
  root.scrollTop = scrollTop;
};

const scrollTo = (scrollTop: number) =>
  act(() => {
    setPage({ scrollTop });
    window.dispatchEvent(new Event("scroll"));
  });

describe("useScrollProgress", () => {
  beforeEach(() => setPage({}));

  describe("defaults", () => {
    it("starts at 0 on a page loaded at the top", () => {
      const { result } = renderHook(() => useScrollProgress());

      expect(result.current).toBe(0);
    });
  });

  describe("usage", () => {
    it("follows the scroll position", () => {
      const { result } = renderHook(() => useScrollProgress());

      scrollTo(1100);
      expect(result.current).toBe(0.5);

      scrollTo(2200);
      expect(result.current).toBe(1);
    });

    it("reads the position on mount when the page is reloaded mid-scroll", () => {
      setPage({ scrollTop: 1100 });
      const { result } = renderHook(() => useScrollProgress());

      expect(result.current).toBe(0.5);
    });
  });

  describe("edge cases", () => {
    it("recomputes on resize when the page becomes shorter than the viewport", () => {
      const { result } = renderHook(() => useScrollProgress());
      scrollTo(1100);

      act(() => {
        setPage({ scrollTop: 0, scrollHeight: 500 });
        window.dispatchEvent(new Event("resize"));
      });

      expect(result.current).toBe(0);
    });

    it("removes its listeners on unmount", () => {
      const removeSpy = jest.spyOn(window, "removeEventListener");
      const { unmount } = renderHook(() => useScrollProgress());

      unmount();

      expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
      removeSpy.mockRestore();
    });
  });
});

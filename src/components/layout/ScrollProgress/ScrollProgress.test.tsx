import { render } from "@testing-library/react";
import { ScrollProgress } from "./ScrollProgress";
import { useScrollProgress } from "@/hooks/useScrollProgress";

jest.mock("@/hooks/useScrollProgress");
const mockedProgress = jest.mocked(useScrollProgress);

const renderBar = (progress: number) => {
  mockedProgress.mockReturnValue(progress);
  const { container } = render(<ScrollProgress />);

  return {
    track: container.firstElementChild as HTMLElement,
    bar: container.querySelector("span") as HTMLElement,
  };
};

describe("ScrollProgress", () => {
  describe("defaults", () => {
    it("renders a decorative track with an empty bar at the top", () => {
      const { track, bar } = renderBar(0);

      expect(track).toHaveAttribute("aria-hidden", "true");
      expect(bar.style.getPropertyValue("--_progress")).toBe("0");
    });
  });

  describe("usage", () => {
    it("passes the scroll progress to the bar", () => {
      expect(renderBar(0.42).bar.style.getPropertyValue("--_progress")).toBe("0.42");
    });
  });

  describe("edge cases", () => {
    it("renders a full bar at the bottom of the page", () => {
      expect(renderBar(1).bar.style.getPropertyValue("--_progress")).toBe("1");
    });
  });
});

import { render, screen } from "@testing-library/react";
import { setReducedMotion, triggerIntersection } from "../../../../jest.setup";
import { REVEAL_PROPS, REVEAL_STAGGER_PROPS } from "@/utils/constants/reveal";
import { ScrollReveal } from "./ScrollReveal";

// jsdom lays nothing out: every element sits at top 0, i.e. inside the viewport.
function placeBelowFold(...elements: HTMLElement[]) {
  elements.forEach((element) => {
    element.getBoundingClientRect = () => ({ top: window.innerHeight + 100 }) as DOMRect;
  });
}

function Page({ withReveal = true }: { withReveal?: boolean }) {
  return (
    <>
      <h2 {...REVEAL_PROPS}>Title</h2>
      <ul {...REVEAL_STAGGER_PROPS}>
        <li>One</li>
        <li>Two</li>
      </ul>
      {withReveal && <ScrollReveal />}
    </>
  );
}

const state = (text: string) => screen.getByText(text).getAttribute("data-reveal-state");

describe("ScrollReveal", () => {
  describe("defaults", () => {
    it("leaves elements already visible on load untouched", () => {
      render(<Page />);

      expect(state("Title")).toBeNull();
      expect(state("One")).toBeNull();
    });
  });

  describe("usage", () => {
    it("hides elements below the fold, then shows them once scrolled into view", () => {
      const { rerender } = render(<Page withReveal={false} />);
      placeBelowFold(screen.getByText("Title"), screen.getByText("One"), screen.getByText("Two"));
      rerender(<Page />);

      expect(state("Title")).toBe("pending");
      triggerIntersection();
      expect(state("Title")).toBe("shown");
    });

    it("staggers the children of a group", () => {
      const { rerender } = render(<Page withReveal={false} />);
      placeBelowFold(screen.getByText("One"), screen.getByText("Two"));
      rerender(<Page />);

      expect(screen.getByText("One").style.getPropertyValue("--reveal-delay")).toBe("0s");
      expect(screen.getByText("Two").style.getPropertyValue("--reveal-delay")).toBe("0.08s");
    });
  });

  describe("edge cases", () => {
    it("never hides anything when the user prefers reduced motion", () => {
      setReducedMotion(true);
      const { rerender } = render(<Page withReveal={false} />);
      placeBelowFold(screen.getByText("Title"));
      rerender(<Page />);

      expect(state("Title")).toBeNull();
    });

    it("renders nothing itself", () => {
      const { container } = render(<ScrollReveal />);

      expect(container).toBeEmptyDOMElement();
    });
  });
});

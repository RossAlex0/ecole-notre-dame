import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ReplayOnAnchorClick } from "./ReplayOnAnchorClick";

// Counts mounts: the number only grows when the children are remounted.
let mounts = 0;
function MountCounter() {
  const [mount] = useState(() => ++mounts);
  return <p>mount {mount}</p>;
}

function Page() {
  return (
    <>
      <nav>
        <a href="#college">Le collège</a>
        <a href="#balma">Balma 2027</a>
      </nav>
      <ReplayOnAnchorClick hash="college">
        <MountCounter />
      </ReplayOnAnchorClick>
    </>
  );
}

describe("ReplayOnAnchorClick", () => {
  beforeEach(() => {
    mounts = 0;
  });

  describe("defaults", () => {
    it("renders its children once", () => {
      render(<Page />);

      expect(screen.getByText("mount 1")).toBeInTheDocument();
    });
  });

  describe("usage", () => {
    it("remounts the hero each time « Le collège » is clicked, even at the top already", () => {
      render(<Page />);

      fireEvent.click(screen.getByText("Le collège"));
      expect(screen.getByText("mount 2")).toBeInTheDocument();
      fireEvent.click(screen.getByText("Le collège"));
      expect(screen.getByText("mount 3")).toBeInTheDocument();
    });
  });

  describe("edge cases", () => {
    it("ignores links to other sections and clicks outside links", () => {
      render(<Page />);

      fireEvent.click(screen.getByText("Balma 2027"));
      fireEvent.click(screen.getByRole("navigation"));
      expect(screen.getByText("mount 1")).toBeInTheDocument();
    });

    it("reacts to a click on an element nested inside the link", () => {
      render(
        <>
          <a href="#college">
            <span>icon</span>
          </a>
          <ReplayOnAnchorClick hash="college">
            <MountCounter />
          </ReplayOnAnchorClick>
        </>,
      );

      fireEvent.click(screen.getByText("icon"));
      expect(screen.getByText("mount 2")).toBeInTheDocument();
    });
  });
});

import { render, screen } from "@testing-library/react";
import { Container } from "./Container";

describe("Container", () => {
  describe("defaults", () => {
    it("renders a div with the container class", () => {
      render(<Container>Content</Container>);
      const element = screen.getByText("Content");

      expect(element.tagName).toBe("DIV");
      expect(element.className).toBe("container");
    });
  });

  describe("usage", () => {
    it("renders the mockup header bar as a nav with an extra class", () => {
      render(
        <Container as="nav" className="bar">
          Menu
        </Container>,
      );
      const element = screen.getByRole("navigation");

      expect(element).toHaveClass("container", "bar");
      expect(element).toHaveTextContent("Menu");
    });
  });

  describe("edge cases", () => {
    it("ignores an empty className without leaving a trailing space", () => {
      render(<Container className="">Content</Container>);

      expect(screen.getByText("Content").className).toBe("container");
    });

    it("supports nested containers", () => {
      render(
        <Container as="section">
          <Container>Inner</Container>
        </Container>,
      );
      const inner = screen.getByText("Inner");

      expect(inner.parentElement?.tagName).toBe("SECTION");
      expect(inner).toHaveClass("container");
    });
  });
});

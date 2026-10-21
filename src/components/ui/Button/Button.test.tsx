import { fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./Button";
import type { ButtonVariant } from "./Button";

describe("Button", () => {
  describe("defaults", () => {
    it("renders a primary native button with type button", () => {
      render(<Button>Send</Button>);
      const button = screen.getByRole("button", { name: "Send" });

      expect(button).toHaveAttribute("type", "button");
      expect(button).toHaveClass("button", "primary");
      expect(button).not.toHaveClass("sm");
    });

    it("renders a link without target or rel when external is not set", () => {
      render(<Button href="#contact">Contact</Button>);
      const link = screen.getByRole("link", { name: "Contact" });

      expect(link).not.toHaveAttribute("target");
      expect(link).not.toHaveAttribute("rel");
    });

    it.each<ButtonVariant>(["primary", "accent", "outline", "outline-light"])(
      "applies the %s variant class",
      (variant) => {
        render(<Button variant={variant}>Label</Button>);

        expect(screen.getByRole("button")).toHaveClass("button", variant);
      },
    );
  });

  describe("usage", () => {
    it("renders the mockup donate anchor link", () => {
      render(
        <Button href="#don" variant="accent">
          Faire un don
        </Button>,
      );
      const link = screen.getByRole("link", { name: "Faire un don" });

      expect(link).toHaveAttribute("href", "#don");
      expect(link).toHaveClass("accent");
    });

    it("renders the HelloAsso link opening safely in a new tab", () => {
      render(
        <Button href="https://www.helloasso.com" variant="accent" external>
          Donner en ligne
        </Button>,
      );
      const link = screen.getByRole("link", { name: "Donner en ligne" });

      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("forwards anchor attributes such as aria-label to the link", () => {
      render(
        <Button href="#balma" aria-label="2 minutes pour nous connaître : voir le film du collège">
          2 minutes pour nous connaître
        </Button>,
      );

      expect(
        screen.getByRole("link", { name: "2 minutes pour nous connaître : voir le film du collège" }),
      ).toHaveAttribute("href", "#balma");
    });

    it("renders an icon hidden from assistive technologies", () => {
      render(
        <Button href="#film" icon={<svg data-testid="play" />}>
          2 minutes pour nous connaître
        </Button>,
      );

      expect(screen.getByTestId("play").parentElement).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByRole("link", { name: "2 minutes pour nous connaître" })).toBeInTheDocument();
    });

    it("forwards native props and click handler to the button", () => {
      const onClick = jest.fn();
      render(
        <Button type="submit" onClick={onClick}>
          Envoyer
        </Button>,
      );
      const button = screen.getByRole("button", { name: "Envoyer" });
      fireEvent.click(button);

      expect(button).toHaveAttribute("type", "submit");
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases", () => {
    it("adds no size class when md is passed explicitly", () => {
      render(<Button size="md">Medium</Button>);

      expect(screen.getByRole("button").className).toBe("button primary");
    });

    it("combines the small size with any variant", () => {
      render(
        <Button href="#soutenir" variant="accent" size="sm">
          Faire un don
        </Button>,
      );

      expect(screen.getByRole("link")).toHaveClass("button", "accent", "sm");
    });

    it("does not call onClick when disabled", () => {
      const onClick = jest.fn();
      render(
        <Button disabled onClick={onClick}>
          Disabled
        </Button>,
      );
      fireEvent.click(screen.getByRole("button"));

      expect(onClick).not.toHaveBeenCalled();
    });

    it("treats external={false} like an internal link", () => {
      render(
        <Button href="https://example.com" external={false}>
          Same tab
        </Button>,
      );

      expect(screen.getByRole("link")).not.toHaveAttribute("target");
    });

    it("still renders a link when href is an empty string", () => {
      render(<Button href="">Empty</Button>);

      expect(screen.getByText("Empty").closest("a")).toHaveAttribute("href", "");
    });

    it("does not render the icon wrapper without icon", () => {
      const { container } = render(<Button>No icon</Button>);

      expect(container.querySelector("[aria-hidden]")).toBeNull();
    });
  });
});

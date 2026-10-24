import { render, screen } from "@testing-library/react";
import { FramedImage } from "./FramedImage";
import { IMAGES } from "@/utils/constants/images";

const picture = { image: IMAGES.hero, alt: "Trois collégiennes", position: "30% center" };

describe("FramedImage", () => {
  describe("defaults", () => {
    it("renders a decorative backdrop behind the photo", () => {
      const { container } = render(<FramedImage picture={picture} ratio="4 / 4.4" sizes="100vw" />);

      expect(container.querySelector(".backdrop")).toHaveAttribute("aria-hidden", "true");
      expect(screen.getByRole("img")).toHaveAttribute("loading", "lazy");
      expect(container.firstElementChild).not.toHaveClass("entrance");
    });
  });

  describe("usage", () => {
    it("renders the hero photo with its alt, ratio and focal point", () => {
      const { container } = render(
        <FramedImage
          picture={picture}
          ratio="4 / 4.4"
          sizes="(max-width: 880px) 100vw, 480px"
          priority
          entrance
        />,
      );
      const img = screen.getByRole("img", { name: "Trois collégiennes" });

      expect((container.firstElementChild as HTMLElement).style.getPropertyValue("--_ratio")).toBe("4 / 4.4");
      expect(img.style.objectPosition).toBe("30% center");
      expect(img).toHaveAttribute("sizes", "(max-width: 880px) 100vw, 480px");
      expect(img).not.toHaveAttribute("loading");
      expect(container.firstElementChild).toHaveClass("frame", "entrance");
    });
  });

  describe("edge cases", () => {
    it("treats an empty alt as a decorative image", () => {
      render(<FramedImage picture={{ image: IMAGES.hero, alt: "" }} ratio="1" sizes="100vw" />);

      expect(screen.queryByRole("img")).toBeNull();
    });

    it("leaves the focal point to the browser default when no position is given", () => {
      const { container } = render(
        <FramedImage picture={{ image: IMAGES.hero, alt: "" }} ratio="1" sizes="100vw" />,
      );

      expect((container.querySelector("img") as HTMLElement).style.objectPosition).toBe("");
    });
  });
});

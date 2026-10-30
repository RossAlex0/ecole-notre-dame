import { fireEvent, render, screen } from "@testing-library/react";
import { VideoModal } from "./VideoModal";

const video = { title: "Le film", embedUrl: "https://www.youtube-nocookie.com/embed/abc?autoplay=1&rel=0" };
const getDialog = (container: HTMLElement) => container.querySelector("dialog") as HTMLDialogElement;

describe("VideoModal", () => {
  describe("defaults", () => {
    it("stays closed and loads nothing from YouTube until opened", () => {
      const { container } = render(<VideoModal video={video} open={false} onClose={jest.fn()} />);

      expect(getDialog(container).open).toBe(false);
      expect(container.querySelector("iframe")).toBeNull();
    });
  });

  describe("usage", () => {
    it("opens as a modal with the film player", () => {
      const { container } = render(<VideoModal video={video} open onClose={jest.fn()} />);

      expect(getDialog(container).open).toBe(true);
      expect(getDialog(container)).toHaveAttribute("aria-label", "Le film");
      expect(screen.getByTitle("Le film")).toHaveAttribute("src", video.embedUrl);
    });

    it("closes with the X button", () => {
      const onClose = jest.fn();
      render(<VideoModal video={video} open onClose={onClose} />);

      fireEvent.click(screen.getByRole("button", { name: "Fermer la vidéo", hidden: true }));
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("edge cases", () => {
    it("closes on a backdrop click but not on a click inside the player area", () => {
      const onClose = jest.fn();
      const { container } = render(<VideoModal video={video} open onClose={onClose} />);

      fireEvent.click(screen.getByTitle("Le film"));
      expect(onClose).not.toHaveBeenCalled();
      fireEvent.click(getDialog(container));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("removes the player once closed, which stops the film", () => {
      const { container, rerender } = render(<VideoModal video={video} open onClose={jest.fn()} />);
      rerender(<VideoModal video={video} open={false} onClose={jest.fn()} />);

      expect(getDialog(container).open).toBe(false);
      expect(container.querySelector("iframe")).toBeNull();
    });

    it("reports a close triggered by the browser (Escape key)", () => {
      const onClose = jest.fn();
      const { container } = render(<VideoModal video={video} open onClose={onClose} />);

      getDialog(container).close();
      expect(onClose).toHaveBeenCalled();
    });
  });
});

import { useCallback, useEffect, useRef, useState } from "react";

type CarouselOptions = {
  autoplayMs: number;
  autoplay: boolean;
};

// Scroll-snap carousel: index follows the scroll position, buttons scroll to a slide.
export function useCarousel(count: number, { autoplayMs, autoplay }: CarouselOptions) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (target: number) => {
      const track = trackRef.current;
      if (!track || count === 0) return;
      const next = (target + count) % count;
      const slide = track.children[next] as HTMLElement | undefined;
      track.scrollTo({ left: (slide?.offsetLeft ?? 0) - track.offsetLeft, behavior: "smooth" });
      setIndex(next);
    },
    [count],
  );

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setIndex(Math.round(track.scrollLeft / track.clientWidth));
  }, []);

  useEffect(() => {
    if (!autoplay || paused || count < 2) return;
    const timer = setInterval(() => goTo(index + 1), autoplayMs);
    return () => clearInterval(timer);
  }, [autoplay, paused, count, index, autoplayMs, goTo]);

  return {
    trackRef,
    index,
    goTo,
    next: () => goTo(index + 1),
    previous: () => goTo(index - 1),
    onScroll,
    pause: () => setPaused(true),
    resume: () => setPaused(false),
  };
}

"use client";

import type { KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Text";
import { useCarousel } from "@/hooks/useCarousel";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { TestimonialsContent } from "@/types/content";
import { REVEAL_PROPS } from "@/utils/constants/reveal";
import styles from "./Testimonials.module.css";

const AUTOPLAY_MS = 7000;

export type TestimonialsProps = {
  content: TestimonialsContent;
};

export function Testimonials({ content }: TestimonialsProps) {
  const { items } = content;
  const reducedMotion = usePrefersReducedMotion();
  const { trackRef, index, goTo, next, previous, onScroll, pause, resume } = useCarousel(items.length, { autoplayMs: AUTOPLAY_MS, autoplay: !reducedMotion });

  const onKeyDown = (event: KeyboardEvent) => {
    const move = { ArrowRight: next, ArrowLeft: previous }[event.key];
    if (!move) return;
    event.preventDefault();
    move();
  };

  return (
    <div className={styles.testimonials}>
      <SectionHeading title={content.title} highlight={content.highlight} align="center" />

      <div
        className={styles.carousel}
        {...REVEAL_PROPS}
        role="region"
        aria-roledescription="carrousel"
        aria-label="Témoignages"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
      >
        <span className={styles.mark} aria-hidden="true">
          “
        </span>

        <div
          ref={trackRef}
          className={styles.track}
          tabIndex={0}
          onScroll={onScroll}
          onKeyDown={onKeyDown}
        >
          {items.map((item, i) => (
            <figure
              key={item.quote}
              className={styles.slide}
              role="group"
              aria-roledescription="témoignage"
              aria-label={`${i + 1} sur ${items.length}`}
            >
              <blockquote>
                <Text variant="heading" size="lg" className={styles.quote}>
                  {item.quote}
                </Text>
              </blockquote>
              <figcaption className={styles.author}>
                <span className={styles.line} aria-hidden="true" />
                <Text as="span" variant="mono" size="xs">
                  {item.author}
                </Text>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.nav}>
          <button type="button" className={styles.arrow} aria-label="Témoignage précédent" onClick={previous}>
            <Icon name="arrowLeft" size={18} />
          </button>
          <div className={styles.dots}>
            {items.map((item, i) => (
              <button
                key={item.quote}
                type="button"
                className={styles.dot}
                aria-label={`Témoignage ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button type="button" className={styles.arrow} aria-label="Témoignage suivant" onClick={next}>
            <Icon name="arrowRight" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

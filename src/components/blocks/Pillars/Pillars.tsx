import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Text";
import type { PillarsContent } from "@/types/content";
import { REVEAL_STAGGER_PROPS } from "@/utils/constants/reveal";
import styles from "./Pillars.module.css";

export type PillarsProps = {
  content: PillarsContent;
};

export function Pillars({ content }: PillarsProps) {
  return (
    <div className={styles.pillars}>
      <SectionHeading title={content.title} highlight={content.highlight} align="center" />

      <ul className={styles.grid} {...REVEAL_STAGGER_PROPS}>
        {content.items.map(({ title, text, picture }) => (
          <li key={title} className={styles.card}>
            <div className={styles.media}>
              <Image
                src={picture.image.src}
                alt={picture.alt}
                fill
                sizes="(max-width: 820px) 460px, 360px"
                className={styles.image}
                style={{ objectPosition: picture.position }}
              />
            </div>
            <Text as="h3" variant="display" size="lg">
              {title}
            </Text>
            <Text size="md" color="muted">
              {text}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}

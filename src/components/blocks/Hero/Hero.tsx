import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FramedImage } from "@/components/ui/FramedImage";
import { Icon } from "@/components/ui/Icon";
import { Lines } from "@/components/ui/Lines";
import { RichParagraph } from "@/components/ui/RichParagraph";
import { Text } from "@/components/ui/Text";
import type { HeroContent } from "@/types/content";
import styles from "./Hero.module.css";

export type HeroProps = {
  content: HeroContent;
};

export function Hero({ content }: HeroProps) {
  const { motto, titleLines, paragraphs, filmCta, registrationCta, picture } = content;

  return (
    <div className={styles.hero}>
      <div className={styles.copy}>
        <Eyebrow className={styles.motto}>{motto}</Eyebrow>

        <Text as="h1" variant="display" className={styles.title}>
          <Lines lines={titleLines} />
        </Text>

        <div className={styles.paragraphs}>
          {paragraphs.map((paragraph) => (
            <RichParagraph key={paragraph.text} paragraph={paragraph} size="md" color="muted" />
          ))}
        </div>

        <div className={styles.ctas}>
          <Button
            href={filmCta.href}
            size="sm"
            aria-label={filmCta.ariaLabel}
            icon={
              <span className={styles.play}>
                <Icon name="play" size={16} />
              </span>
            }
          >
            {filmCta.label}
          </Button>
          <Button href={registrationCta.href} variant="outline" size="sm">
            {registrationCta.label}
          </Button>
        </div>
      </div>

      <FramedImage
        picture={picture}
        ratio="4 / 4.4"
        sizes="(max-width: 880px) 100vw, 480px"
        priority
        className={styles.photo}
      />
    </div>
  );
}

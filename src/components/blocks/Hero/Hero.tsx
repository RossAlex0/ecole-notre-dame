import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FramedImage } from "@/components/ui/FramedImage";
import { Lines } from "@/components/ui/Lines";
import { RichParagraph } from "@/components/ui/RichParagraph";
import { Text } from "@/components/ui/Text";
import type { HeroContent } from "@/types/content";
import { cn } from "@/utils/cn";
import { FilmButton } from "./FilmButton";
import styles from "./Hero.module.css";

export type HeroProps = {
  content: HeroContent;
};

export function Hero({ content }: HeroProps) {
  const { motto, titleLines, paragraphs, filmCta, registrationCta, picture } = content;

  return (
    <div className={styles.hero}>
      <div className={styles.copy}>
        <Eyebrow className={cn(styles.enter, styles.motto)}>{motto}</Eyebrow>

        <Text as="h1" variant="display" className={cn(styles.enter, styles.title)}>
          <Lines lines={titleLines} />
        </Text>

        <div className={styles.paragraphs}>
          {paragraphs.map((paragraph) => (
            <RichParagraph
              key={paragraph.text}
              paragraph={paragraph}
              size="md"
              color="muted"
              className={styles.enter}
            />
          ))}
        </div>

        <div className={cn(styles.enter, styles.ctas)}>
          <FilmButton cta={filmCta} />
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
        entrance
        className={styles.photo}
      />
    </div>
  );
}

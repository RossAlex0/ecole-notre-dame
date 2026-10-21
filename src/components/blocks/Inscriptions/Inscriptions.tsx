import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FramedImage } from "@/components/ui/FramedImage";
import { Icon } from "@/components/ui/Icon";
import { RichParagraph } from "@/components/ui/RichParagraph";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { InscriptionsContent } from "@/types/content";
import styles from "./Inscriptions.module.css";

export type InscriptionsProps = {
  content: InscriptionsContent;
};

export function Inscriptions({ content }: InscriptionsProps) {
  const { eyebrow, title, highlight, paragraphs, cta, picture } = content;

  return (
    <div className={styles.inscriptions}>
      <div className={styles.copy}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <SectionHeading title={title} highlight={highlight} className={styles.heading} />
        {paragraphs.map((paragraph) => (
          <RichParagraph
            key={`${paragraph.text}${paragraph.strong ?? ""}`}
            paragraph={paragraph}
            size="md"
            color="primary"
            className={styles.paragraph}
          />
        ))}
        <Button href={cta.href} icon={<Icon name="mail" size={20} />} className={styles.cta}>
          {cta.label}
        </Button>
      </div>

      <FramedImage picture={picture} ratio="16 / 10" sizes="(max-width: 860px) 100vw, 520px" />
    </div>
  );
}

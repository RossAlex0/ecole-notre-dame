import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BalmaContent } from "@/types/content";
import { BalmaDrawing } from "./BalmaDrawing";
import { KeyFigureItem } from "./KeyFigureItem";
import { VideoTeaser } from "./VideoTeaser";
import { REVEAL_STAGGER_PROPS } from "@/utils/constants/reveal";
import styles from "./Balma.module.css";

export type BalmaProps = {
  content: BalmaContent;
};

export function Balma({ content }: BalmaProps) {
  return (
    <>
      <div className={styles.head}>
        <SectionHeading
          title={content.title}
          highlight={content.highlight}
          lede={content.lede}
          tone="dark"
          className={styles.heading}
        />
        <BalmaDrawing {...content.drawing} className={styles.drawing} />
      </div>

      <div className={styles.grid}>
        <VideoTeaser video={content.video} />
        <ul className={styles.figures} {...REVEAL_STAGGER_PROPS}>
          {content.keyFigures.map((figure) => (
            <KeyFigureItem key={figure.label} figure={figure} />
          ))}
        </ul>
      </div>
    </>
  );
}

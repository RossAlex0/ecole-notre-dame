import { Text } from "@/components/ui/Text";
import { cn } from "@/utils/cn";
import styles from "./SectionHeading.module.css";

export type SectionHeadingProps = {
  title: string;
  highlight?: string;
  lede?: string;
  level?: 1 | 2;
  className?: string;
};

export function SectionHeading({
  title,
  highlight,
  lede,
  level = 2,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(styles.heading, className)}>
      <Text as={level === 1 ? "h1" : "h2"} variant="display">
        {title}
        {highlight && (
          <>
            {" "}
            <Text as="span" variant="display" color="accent">
              {highlight}
            </Text>
          </>
        )}
      </Text>
      {lede && (
        <Text size="lg" color="muted" className={styles.lede}>
          {lede}
        </Text>
      )}
    </div>
  );
}

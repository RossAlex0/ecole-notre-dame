import { Text } from "@/components/ui/Text";
import type { TextColor, TextSize } from "@/components/ui/Text";
import { cn } from "@/utils/cn";
import styles from "./SectionHeading.module.css";

export type SectionHeadingTone = "light" | "dark";
export type SectionHeadingAlign = "start" | "center";

// Colors per background tone: light sections use blue/orange, dark sections white/gold.
const TONE_COLORS: Record<SectionHeadingTone, Record<"title" | "highlight" | "lede", TextColor>> = {
  light: { title: "primary", highlight: "accent", lede: "muted" },
  dark: { title: "white", highlight: "gold", lede: "white" },
};

// Section titles use the mockup's clamp(28px, 3.4vw, 44px); a page title is larger.
const LEVEL_SIZES: Record<1 | 2, TextSize> = { 1: "3xl", 2: "2xl" };

export type SectionHeadingProps = {
  title: string;
  highlight?: string;
  lede?: string;
  level?: 1 | 2;
  tone?: SectionHeadingTone;
  align?: SectionHeadingAlign;
  className?: string;
};

export function SectionHeading({
  title,
  highlight,
  lede,
  level = 2,
  tone = "light",
  align = "start",
  className,
}: SectionHeadingProps) {
  const colors = TONE_COLORS[tone];
  const size = LEVEL_SIZES[level];

  return (
    <div className={cn(styles.heading, styles[align], className)}>
      <Text as={`h${level}`} variant="display" size={size} color={colors.title}>
        {title}
        {highlight && (
          <>
            {" "}
            <Text as="span" variant="display" size={size} color={colors.highlight}>
              {highlight}
            </Text>
          </>
        )}
      </Text>
      {lede && (
        <Text size="md" color={colors.lede} className={styles.lede}>
          {lede}
        </Text>
      )}
    </div>
  );
}

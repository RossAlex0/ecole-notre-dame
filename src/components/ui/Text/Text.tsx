import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/utils/cn";
import styles from "./Text.module.css";

export type TextVariant = "display" | "heading" | "body" | "mono" | "hand";
export type TextSize = "xs" | "sm" | "md" | "base" | "lg" | "xl" | "2xl" | "3xl";
export type TextColor = "text" | "muted" | "primary" | "accent" | "gold" | "white";
export type TextElement = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "strong" | "blockquote";

const VARIANT_DEFAULTS: Record<TextVariant, { size: TextSize; color: TextColor }> = {
  display: { size: "3xl", color: "primary" },
  heading: { size: "xl", color: "primary" },
  body: { size: "base", color: "text" },
  mono: { size: "xs", color: "primary" },
  hand: { size: "xl", color: "accent" },
};

export type TextProps = {
  as?: TextElement;
  variant?: TextVariant;
  size?: TextSize;
  color?: TextColor;
  className?: string;
  children: ReactNode;
};

export function Text({
  as: Tag = "p",
  variant = "body",
  size,
  color,
  className,
  children,
}: TextProps) {
  const defaults = VARIANT_DEFAULTS[variant];
  const style = {
    "--_size": `var(--text-${size ?? defaults.size})`,
    "--_color": `var(--color-${color ?? defaults.color})`,
  } as CSSProperties;

  return (
    <Tag className={cn(styles.text, styles[variant], className)} style={style}>
      {children}
    </Tag>
  );
}

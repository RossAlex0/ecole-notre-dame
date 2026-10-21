"use client";

import type { CSSProperties } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";
import styles from "./BalmaDrawing.module.css";

type Stroke = { kind: "main" | "detail" | "hatch" | "rule"; d: string; delay: number; duration: number };

const TREE_LARGE =
  "c-10.0 0 -14.0 -12.0 -6.0 -18.0 c-4.0 -12.0 8.0 -20.0 16.0 -14.0 c4.0 -10.0 20.0 -10.0 22.0 2.0 c10.0 -2.0 16.0 10.0 8.0 18.0 c6.0 8.0 -2.0 16.0 -10.0 12.0 Z";
const TREE_SMALL =
  "c-6.5 0 -9.1 -7.8 -3.9 -11.7 c-2.6 -7.8 5.2 -13.0 10.4 -9.1 c2.6 -6.5 13.0 -6.5 14.3 1.3 c6.5 -1.3 10.4 6.5 5.2 11.7 c3.9 5.2 -1.3 10.4 -6.5 7.8 Z";
const RAILING = Array.from({ length: 19 }, (_, i) => `M${84 + i * 14} 132 V146`).join(" ");

// Line drawing of the Balma building, copied from the mockup, drawn stroke by stroke.
const STROKES: Stroke[] = [
  { kind: "main", d: "M10 190 H430", delay: 0.06, duration: 0.56 },
  { kind: "main", d: "M92 190 V100 H328 V190", delay: 0.48, duration: 0.56 },
  { kind: "main", d: "M76 101 L122 70 H298 L344 101 Z", delay: 0.9, duration: 0.56 },
  { kind: "main", d: "M266 70 V56 H280 V70", delay: 1.31, duration: 0.56 },
  { kind: "main", d: "M70 146 H350 M70 146 V132 H350 V146", delay: 1.74, duration: 0.56 },
  { kind: "main", d: "M98 190 V146 M158 190 V146 M262 190 V146 M322 190 V146", delay: 2.15, duration: 0.56 },
  {
    kind: "main",
    d: "M196 190 V160 H224 V190 M118 190 V162 H140 V190 M280 190 V162 H302 V190",
    delay: 2.57,
    duration: 0.56,
  },
  { kind: "detail", d: RAILING, delay: 2.99, duration: 0.37 },
  {
    kind: "detail",
    d: "M112 106 h20 v20 h-20 Z M122 106 v20 M112 116 h20 M152 106 h20 v20 h-20 Z M162 106 v20 M152 116 h20 M248 106 h20 v20 h-20 Z M258 106 v20 M248 116 h20 M288 106 h20 v20 h-20 Z M298 106 v20 M288 116 h20 M210 160 V190",
    delay: 3.27,
    duration: 0.37,
  },
  {
    kind: "hatch",
    d: "M130 70 l-12 18 M150 70 l-18 26 M170 70 l-20 30 M190 70 l-20 30 M210 70 l-20 30 M230 70 l-20 30 M250 70 l-20 30 M270 70 l-20 30 M290 70 l-20 30 M306 76 l-16 24 M322 86 l-10 14",
    delay: 3.55,
    duration: 0.25,
  },
  { kind: "detail", d: `M22.0 190.0 V164.0 M10.0 168.0 ${TREE_LARGE}`, delay: 3.6, duration: 0.6 },
  { kind: "rule", d: "M92 206 H328 M92 201 V211 M328 201 V211", delay: 3.71, duration: 0.62 },
  { kind: "detail", d: `M50.0 190.0 V173.1 M42.2 175.7 ${TREE_SMALL}`, delay: 3.8, duration: 0.6 },
  { kind: "detail", d: `M370.0 190.0 V173.1 M362.2 175.7 ${TREE_SMALL}`, delay: 4.0, duration: 0.6 },
  { kind: "detail", d: `M404.0 190.0 V164.0 M392.0 168.0 ${TREE_LARGE}`, delay: 4.2, duration: 0.6 },
];

const timing = (delay: number, duration = 0.5) =>
  ({ "--_delay": `${delay}s`, "--_duration": `${duration}s` }) as CSSProperties;

export type BalmaDrawingProps = {
  caption: string;
  annotation: string;
  label: string;
  className?: string;
};

export function BalmaDrawing({ caption, annotation, label, className }: BalmaDrawingProps) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={cn(styles.drawing, !reducedMotion && styles.animated, inView && styles.run, className)}
    >
      <svg viewBox="0 48 440 205" aria-hidden="true">
        {STROKES.map(({ kind, d, delay, duration }) => (
          <path key={d} pathLength={1} d={d} className={cn(styles.stroke, styles[kind])} style={timing(delay, duration)} />
        ))}
        <text x="210" y="226" textAnchor="middle" className={cn(styles.fade, styles.caption)} style={timing(4.18)}>
          {caption}
        </text>
        <path d="M336 120 L380 92" className={cn(styles.fade, styles.leader)} style={timing(4.25)} />
        <circle cx="336" cy="120" r="2.4" className={cn(styles.fade, styles.dot)} style={timing(4.33)} />
        <text x="352" y="84" className={cn(styles.fade, styles.annotation)} style={timing(4.4)}>
          {annotation}
        </text>
      </svg>
    </div>
  );
}

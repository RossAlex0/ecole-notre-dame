"use client";

import type { CSSProperties } from "react";
import { useId } from "react";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/utils/cn";
import { getCollectedRatio } from "@/utils/donation";
import { formatEuros, formatMillionEuros, formatPercent } from "@/utils/format";
import styles from "./CollectionChart.module.css";

// House facade spans x = 110 → 410 in the drawing; the collected share fills it from the left.
const HOUSE_LEFT = 110;
const HOUSE_RIGHT = 410;

// Gold scribble filling the remaining share, copied from the mockup and clipped to it.
const SCRIBBLES = [
  "M212.5 236 L363.6 76 L371.1 76 L217.2 236 L224.1 236 L375.5 76 L379.7 76 L229.5 236 L233.6 236 L386.7 76 L390.8 76 L239.3 236 L245.8 236 L399.3 76 L402 76 L250.7 236 L257.4 236 L410.8 76 L414.8 76 L262.2 236 L269.4 236",
  "M269.4 236 L418.2 76 L426.9 76 L272.9 236 L277.9 236 L429.5 76 L435.7 76 L285.4 236 L289 236 L442.3 76 L448.1 76 L295.1 236 L301.1 236 L451.3 76 L456.7 76 L305.6 236 L312.5 236 L463.7 76 L468.8 76 L317.8 236 L322.9 236 L474.2 76",
  "M474.2 76 L481.7 76 L329.1 236 L333.2 236 L486.3 76 L491.6 76 L340.6 236 L345.7 236 L496.2 76 L504.4 76 L349.4 236 L355.8 236 L509 76 L512.1 76 L361.5 236 L365.6 236 L519.7 76 L525.6 76 L372.7 236 L379.1 236 L529.3 76 L536.3 76",
  "M536.3 76 L383.8 236 L389.2 236 L540.8 76 L547.9 76 L395.8 236 L399.9 236 L552.7 76 L555.7 76 L406.1 236 L411.4 236 L565 76 L569.8 76 L415.9 236 L421.7 236 L574.7 76 L577.6 76 L427.4 236",
];
const RAILING = Array.from({ length: 19 }, (_, i) => `M${116 + i * 16} 160 V172`).join(" ");
const HATCH = Array.from({ length: 14 }, (_, i) => `M${130 + i * 22} 121 L${170 + i * 22} 84`).join(" ");
const WINDOWS = [140, 196, 296, 360].map((x) => `M${x} 128 h26 v22 h-26 Z M${x + 13} 128 v22 M${x} 139 h26`);
const TREES = [
  "M40 230 V201.4 M26.8 205.8 c-11 0 -15.4 -13.2 -6.6 -19.8 c-4.4 -13.2 8.8 -22 17.6 -15.4 c4.4 -11 22 -11 24.2 2.2 c11 -2.2 17.6 11 8.8 19.8 c6.6 8.8 -2.2 17.6 -11 13.2 Z",
  "M70 230 V210.5 M61 213.5 c-7.5 0 -10.5 -9 -4.5 -13.5 c-3 -9 6 -15 12 -10.5 c3 -7.5 15 -7.5 16.5 1.5 c7.5 -1.5 12 7.5 6 13.5 c4.5 6 -1.5 12 -7.5 9 Z",
  "M470 230 V204 M458 208 c-10 0 -14 -12 -6 -18 c-4 -12 8 -20 16 -14 c4 -10 20 -10 22 2 c10 -2 16 10 8 18 c6 8 -2 16 -10 12 Z",
  "M496 230 V211.8 M487.6 214.6 c-7 0 -9.8 -8.4 -4.2 -12.6 c-2.8 -8.4 5.6 -14 11.2 -9.8 c2.8 -7 14 -7 15.4 1.4 c7 -1.4 11.2 7 5.6 12.6 c4.2 5.6 -1.4 11.2 -7 8.4 Z",
];

export type CollectionChartProps = {
  collected: number;
  goal: number;
  className?: string;
};

export function CollectionChart({ collected, goal, className }: CollectionChartProps) {
  const { ref, inView } = useInView<HTMLElement>(0.5);
  const reducedMotion = usePrefersReducedMotion();
  const clipId = useId();

  const ratio = getCollectedRatio(collected, goal);
  const remaining = Math.max(0, goal - collected);
  const split = HOUSE_LEFT + (HOUSE_RIGHT - HOUSE_LEFT) * ratio;
  const label = `Avancement de la collecte : ${formatMillionEuros(collected)} déjà réunis sur ${formatMillionEuros(goal)}, soit ${formatPercent(ratio)}. Il reste ${formatEuros(remaining)} à collecter, soit ${formatPercent(1 - ratio)}.`;

  return (
    <figure
      ref={ref}
      aria-label={label}
      className={cn(styles.chart, !reducedMotion && styles.animated, inView && styles.run, className)}
    >
      <svg viewBox="0 -54 520 346" aria-hidden="true">
        <defs>
          <clipPath id={clipId}>
            <path d={`M${split} 84 H370 L428 121 H${HOUSE_RIGHT} V230 H${split} Z`} />
          </clipPath>
        </defs>
        <g className={styles.scribble} clipPath={`url(#${clipId})`}>
          {SCRIBBLES.map((d, i) => (
            <path key={d} d={d} pathLength={1} style={{ "--_delay": `${0.35 + i * 0.5}s` } as CSSProperties} />
          ))}
        </g>
        <g className={styles.house}>
          <path d="M92 121 L150 84 H370 L428 121 Z" />
          <path d="M110 121 V230 H410 V121" />
          <path d="M330 84 V68 H346 V84" />
          <path d="M100 160 H420 V172 H100 Z" />
          <path className={styles.thin} d={RAILING} />
          {WINDOWS.map((d) => (
            <path key={d} d={d} />
          ))}
          <path d="M150 230 V194 H180 V230 M250 230 V194 H286 V230 M360 230 V194 H390 V230 M268 194 V230" />
          <path className={styles.thin} d={HATCH} />
        </g>
        <g className={styles.trees}>
          {TREES.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <path className={styles.ground} d="M14 230 H506" />
        <path className={styles.dimension} d={`M${HOUSE_LEFT} 34 H${split - 4} M${HOUSE_LEFT} 28 V80 M${split - 4} 28 V40`} />
        <path className={cn(styles.dimension, styles.gold)} d={`M${split + 4} 34 H${HOUSE_RIGHT} M${split + 4} 28 V80 M${HOUSE_RIGHT} 28 V80`} />
        <text className={styles.big} x={(HOUSE_LEFT + split) / 2} y="-10" textAnchor="middle">
          {formatPercent(ratio)}
        </text>
        <text className={styles.sub} x={(HOUSE_LEFT + split) / 2} y="16" textAnchor="middle">
          <tspan className={styles.bold}>{formatMillionEuros(collected)}</tspan> déjà réunis
        </text>
        <text className={cn(styles.big, styles.gold)} x="430" y="-10" textAnchor="middle">
          {formatPercent(1 - ratio)}
        </text>
        <text className={cn(styles.sub, styles.gold)} x="430" y="16" textAnchor="middle">
          <tspan className={styles.bold}>{formatEuros(remaining)}</tspan> à collecter
        </text>
        <path className={styles.total} d="M110 254 H410 M116 248 L110 254 L116 260 M404 248 L410 254 L404 260" />
        <text className={styles.sub} x="260" y="282" textAnchor="middle">
          <tspan className={styles.bold}>{formatMillionEuros(goal)}</tspan> coût total du projet
        </text>
      </svg>
    </figure>
  );
}

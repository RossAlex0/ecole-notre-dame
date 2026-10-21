"use client";

import { Icon } from "@/components/ui/Icon";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { KeyFigure } from "@/types/content";
import { formatNumber } from "@/utils/format";
import styles from "./Balma.module.css";

export type KeyFigureItemProps = {
  figure: KeyFigure;
};

export function KeyFigureItem({ figure }: KeyFigureItemProps) {
  const { ref, inView } = useInView<HTMLLIElement>(0.6);
  const reducedMotion = usePrefersReducedMotion();
  const value = useCountUp(figure.value, inView, !reducedMotion);

  return (
    <li ref={ref} className={styles.figure}>
      <Icon name={figure.icon} size={44} className={styles.figureIcon} />
      <b className={styles.figureValue}>
        {formatNumber(value)}
        {figure.unit}
      </b>
      <span className={styles.figureLabel}>{figure.label}</span>
    </li>
  );
}

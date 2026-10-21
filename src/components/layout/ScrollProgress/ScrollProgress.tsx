"use client";

import type { CSSProperties } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import styles from "./ScrollProgress.module.css";

export function ScrollProgress() {
  const progress = useScrollProgress();
  const style = { "--_progress": progress } as CSSProperties;

  return (
    <div className={styles.track} aria-hidden="true">
      <span className={styles.bar} style={style} />
    </div>
  );
}

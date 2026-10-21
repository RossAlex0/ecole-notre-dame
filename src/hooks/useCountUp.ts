import { useEffect, useState } from "react";

const DURATION_MS = 1400;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// Counts from 0 to target once `active` is true; returns the target when animation is disabled.
export function useCountUp(target: number, active: boolean, enabled: boolean): number {
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    if (!enabled || !active) return;

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION_MS);
      setValue(Math.round(target * easeOutCubic(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [target, active, enabled]);

  if (!enabled) return target;
  return active ? (value ?? 0) : 0;
}

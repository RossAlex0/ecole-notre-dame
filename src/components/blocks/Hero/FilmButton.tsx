"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { VideoModal } from "@/components/ui/VideoModal";
import type { FilmCallToAction } from "@/types/content";
import styles from "./Hero.module.css";

export type FilmButtonProps = {
  cta: FilmCallToAction;
};

// Hero button opening the welcome film in a modal player.
export function FilmButton({ cta }: FilmButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        aria-label={cta.ariaLabel}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        icon={
          <span className={styles.play}>
            <Icon name="play" size={16} />
          </span>
        }
      >
        {cta.label}
      </Button>
      <VideoModal video={cta.video} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

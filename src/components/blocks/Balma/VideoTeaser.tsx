"use client";

import { useState } from "react";
import Image from "next/image";
import type { BalmaContent } from "@/types/content";
import styles from "./Balma.module.css";

export type VideoTeaserProps = {
  video: BalmaContent["video"];
};

// Video placeholder: the play button reveals a message until the film is provided.
export function VideoTeaser({ video }: VideoTeaserProps) {
  const [showMessage, setShowMessage] = useState(false);
  const { picture, playLabel, placeholder } = video;

  return (
    <div className={styles.screen}>
      <Image
        src={picture.image.src}
        alt={picture.alt}
        fill
        sizes="(max-width: 880px) 100vw, 640px"
        className={styles.screenImage}
        style={{ objectPosition: picture.position }}
      />
      <button type="button" className={styles.play} aria-label={playLabel} onClick={() => setShowMessage(true)}>
        <span className={styles.playBadge} aria-hidden="true" />
      </button>
      <p className={styles.message} role="status" hidden={!showMessage}>
        {placeholder}
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import type { BalmaContent } from "@/types/content";
import styles from "./Balma.module.css";

export type VideoTeaserProps = {
  video: BalmaContent["video"];
};

// Still image with a play button; the YouTube player is only loaded on click (no third party before).
export function VideoTeaser({ video }: VideoTeaserProps) {
  const [playing, setPlaying] = useState(false);
  const { picture, playLabel, title, embedUrl } = video;

  return (
    <div className={styles.screen}>
      {playing ? (
        <iframe
          src={embedUrl}
          title={title}
          className={styles.player}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <>
          <Image
            src={picture.image.src}
            alt={picture.alt}
            fill
            sizes="(max-width: 880px) 100vw, 640px"
            className={styles.screenImage}
            style={{ objectPosition: picture.position }}
          />
          <button type="button" className={styles.play} aria-label={playLabel} onClick={() => setPlaying(true)}>
            <span className={styles.playBadge} aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  );
}

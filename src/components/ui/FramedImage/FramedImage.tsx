import type { CSSProperties } from "react";
import Image from "next/image";
import type { Picture } from "@/types/content";
import { cn } from "@/utils/cn";
import styles from "./FramedImage.module.css";

export type FramedImageProps = {
  picture: Picture;
  // CSS aspect-ratio of the visible photo, e.g. "4 / 4.4".
  ratio: string;
  // next/image sizes hint for responsive loading.
  sizes: string;
  priority?: boolean;
  // Plays the mockup entrance: photo rises in, then the tan block slides into place.
  entrance?: boolean;
  className?: string;
};

// Photo with an offset tan block behind it, as in the mockup.
export function FramedImage({
  picture,
  ratio,
  sizes,
  priority = false,
  entrance = false,
  className,
}: FramedImageProps) {
  const style = { "--_ratio": ratio } as CSSProperties;

  return (
    <div className={cn(styles.frame, entrance && styles.entrance, className)} style={style}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.media}>
        <Image
          src={picture.image.src}
          alt={picture.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.image}
          style={{ objectPosition: picture.position }}
        />
      </div>
    </div>
  );
}

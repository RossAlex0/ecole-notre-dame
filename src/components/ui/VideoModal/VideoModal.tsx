"use client";

import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import type { Video } from "@/types/content";
import styles from "./VideoModal.module.css";

export type VideoModalProps = {
  video: Video;
  open: boolean;
  onClose: () => void;
};

// Native modal dialog (focus trap, Escape) whose player only exists while open, so closing stops the film.
export function VideoModal({ video, open, onClose }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // A click landing on the dialog itself (not its content) is a click on the backdrop.
  const closeOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <dialog ref={dialogRef} className={styles.dialog} aria-label={video.title} onClose={onClose} onClick={closeOnBackdrop}>
      <button type="button" className={styles.close} aria-label="Fermer la vidéo" onClick={onClose}>
        <Icon name="close" size={28} />
      </button>
      {open && (
        <iframe
          src={video.embedUrl}
          title={video.title}
          className={styles.player}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      )}
    </dialog>
  );
}

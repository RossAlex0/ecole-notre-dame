import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { ErrorContent } from "@/types/content";
import styles from "./ErrorState.module.css";

export type ErrorStateProps = {
  content: ErrorContent;
  actions: ReactNode;
};

// Shared layout of the 404 and runtime error pages.
export function ErrorState({ content, actions }: ErrorStateProps) {
  return (
    <div className={styles.error}>
      <Eyebrow>{content.eyebrow}</Eyebrow>
      <SectionHeading title={content.title} highlight={content.highlight} lede={content.text} level={1} />
      <div className={styles.actions}>{actions}</div>
    </div>
  );
}

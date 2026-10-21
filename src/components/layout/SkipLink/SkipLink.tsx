import styles from "./SkipLink.module.css";

export type SkipLinkProps = {
  targetId: string;
};

// First focusable element: lets keyboard users jump past the navigation.
export function SkipLink({ targetId }: SkipLinkProps) {
  return (
    <a href={`#${targetId}`} className={styles.skipLink}>
      Aller au contenu principal
    </a>
  );
}

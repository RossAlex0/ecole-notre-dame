import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/utils/cn";
import styles from "./Section.module.css";

export type SectionBackground = "white" | "paper" | "primary";

export type SectionProps = {
  id?: string;
  background?: SectionBackground;
  // Tighter top padding for the opening section of a page.
  compactTop?: boolean;
  className?: string;
  children: ReactNode;
};

export function Section({ id, background = "white", compactTop = false, className, children }: SectionProps) {
  return (
    <section id={id} className={cn(styles.section, styles[background], compactTop && styles.compactTop, className)}>
      <Container>{children}</Container>
    </section>
  );
}

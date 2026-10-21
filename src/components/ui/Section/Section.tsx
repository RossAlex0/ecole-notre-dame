import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/utils/cn";
import styles from "./Section.module.css";

export type SectionBackground = "white" | "paper" | "primary";

export type SectionProps = {
  id?: string;
  background?: SectionBackground;
  className?: string;
  children: ReactNode;
};

export function Section({ id, background = "white", className, children }: SectionProps) {
  return (
    <section id={id} className={cn(styles.section, styles[background], className)}>
      <Container>{children}</Container>
    </section>
  );
}

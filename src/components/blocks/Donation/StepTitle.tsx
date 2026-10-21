import { cn } from "@/utils/cn";
import styles from "./StepTitle.module.css";

export type StepTitleProps = {
  step: number;
  title: string;
  tone: "light" | "dark";
};

// Big tan step number followed by an uppercase title ("1 Simulez votre don").
export function StepTitle({ step, title, tone }: StepTitleProps) {
  return (
    <h3 className={cn(styles.stepTitle, styles[tone])}>
      <span className={styles.number} aria-hidden="true">
        {step}
      </span>
      <span className={styles.label}>{title}</span>
    </h3>
  );
}

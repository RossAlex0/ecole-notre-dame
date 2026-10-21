import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { cn } from "@/utils/cn";
import styles from "./Eyebrow.module.css";

export type EyebrowProps = {
  children: string;
  className?: string;
};

// Small star + mono label shown above a title.
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={cn(styles.eyebrow, className)}>
      <Icon name="star" size={20} />
      <Text as="span" variant="mono" size="sm" className={styles.label}>
        {children}
      </Text>
    </p>
  );
}

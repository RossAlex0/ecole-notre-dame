import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { DonationContent } from "@/types/content";
import { cn } from "@/utils/cn";
import { CollectionChart } from "./CollectionChart";
import { PaymentOptions } from "./PaymentOptions";
import { StepTitle } from "./StepTitle";
import { TaxSimulator } from "./TaxSimulator";
import styles from "./Donation.module.css";

export type DonationProps = {
  content: DonationContent;
};

export function Donation({ content }: DonationProps) {
  const { receipt } = content;

  return (
    <>
      <div className={styles.head}>
        <SectionHeading
          title={content.title}
          highlight={content.highlight}
          lede={content.lede}
          tone="dark"
          className={styles.heading}
        />
        <CollectionChart {...content.campaign} className={styles.chart} />
      </div>

      <div className={styles.grid}>
        <TaxSimulator simulator={content.simulator} />

        <div className={styles.rightColumn}>
          <PaymentOptions payment={content.payment} className={styles.card} />

          <div className={cn(styles.card, styles.receipt)}>
            <StepTitle step={3} title={receipt.title} tone="dark" />
            <p className={styles.receiptText}>{receipt.text}</p>
            <Button href={receipt.cta.href} variant="outline-light" size="sm" className={styles.receiptCta}>
              {receipt.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

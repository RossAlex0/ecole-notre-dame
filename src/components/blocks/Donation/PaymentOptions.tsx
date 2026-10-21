"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Lines } from "@/components/ui/Lines";
import { RichText } from "@/components/ui/RichText";
import { TabPanels, Tabs } from "@/components/ui/Tabs";
import type { DonationContent } from "@/types/content";
import { StepTitle } from "./StepTitle";
import styles from "./PaymentOptions.module.css";

export type PaymentOptionsProps = {
  payment: DonationContent["payment"];
  className?: string;
};

export function PaymentOptions({ payment, className }: PaymentOptionsProps) {
  const { methods } = payment;
  const idPrefix = useId();
  const [methodId, setMethodId] = useState(methods[0]?.id ?? "");

  return (
    <div className={className}>
      <StepTitle step={2} title={payment.title} tone="dark" />

      <Tabs
        items={methods}
        selectedId={methodId}
        onSelect={setMethodId}
        label={payment.methodsLabel}
        idPrefix={idPrefix}
        tone="dark"
      />

      <TabPanels
        items={methods}
        selectedId={methodId}
        idPrefix={idPrefix}
        panelClassName={styles.method}
        renderPanel={({ text, details, cta }) => (
          <>
            <p>
              <RichText segments={text} />
            </p>
            {details && (
              <p className={styles.details}>
                <Lines lines={details} />
              </p>
            )}
            {cta && (
              <Button
                href={cta.href}
                variant={cta.variant}
                external={cta.external}
                download={cta.download || undefined}
                className={styles.cta}
              >
                {cta.label}
              </Button>
            )}
          </>
        )}
      />
    </div>
  );
}

"use client";

import { useId, useState } from "react";
import { RichText } from "@/components/ui/RichText";
import { TabPanels, Tabs } from "@/components/ui/Tabs";
import type { DonationContent } from "@/types/content";
import { computeDonationCost } from "@/utils/donation";
import { formatEuros, formatPercent } from "@/utils/format";
import { StepTitle } from "./StepTitle";
import styles from "./TaxSimulator.module.css";

export type TaxSimulatorProps = {
  simulator: DonationContent["simulator"];
};

export function TaxSimulator({ simulator }: TaxSimulatorProps) {
  const { profiles } = simulator;
  const idPrefix = useId();
  const [profileId, setProfileId] = useState(profiles[0]?.id ?? "");
  const [amount, setAmount] = useState(String(simulator.defaultAmount));
  const rate = (profiles.find((item) => item.id === profileId) ?? profiles[0])?.reductionRate ?? 0;
  const amountId = `${idPrefix}-amount`;

  return (
    <div className={styles.simulator}>
      <StepTitle step={1} title={simulator.title} tone="light" />

      <Tabs
        items={profiles}
        selectedId={profileId}
        onSelect={setProfileId}
        label={simulator.profilesLabel}
        idPrefix={idPrefix}
      />

      <TabPanels
        items={profiles}
        selectedId={profileId}
        idPrefix={idPrefix}
        className={styles.profiles}
        panelClassName={styles.profile}
        renderPanel={(profile) => (
          <>
            <b>{profile.title}</b>
            <p>
              <RichText segments={profile.text} />
            </p>
          </>
        )}
      />

      <div className={styles.field}>
        <label htmlFor={amountId}>{simulator.amountLabel}</label>
        <div className={styles.amount}>
          <input
            id={amountId}
            type="number"
            min={0}
            step={50}
            inputMode="numeric"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <span aria-hidden="true">€</span>
        </div>
      </div>

      <div className={styles.result} aria-live="polite">
        <p>
          Après réduction d&apos;impôt ({formatPercent(rate)}),
          <br />
          {simulator.resultLabel}
        </p>
        <b>{formatEuros(computeDonationCost(Number(amount), rate))}</b>
      </div>
    </div>
  );
}

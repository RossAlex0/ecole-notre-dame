"use client";

import { Fragment, useCallback, useState } from "react";
import type { ReactNode } from "react";
import { useAnchorClick } from "@/hooks/useAnchorClick";

export type ReplayOnAnchorClickProps = {
  // Section id the links point to, without "#".
  hash: string;
  children: ReactNode;
};

// Remounts its children when a link to #hash is clicked, replaying their CSS entrance animations.
export function ReplayOnAnchorClick({ hash, children }: ReplayOnAnchorClickProps) {
  const [round, setRound] = useState(0);
  const replay = useCallback(() => setRound((current) => current + 1), []);

  useAnchorClick(hash, replay);

  return <Fragment key={round}>{children}</Fragment>;
}

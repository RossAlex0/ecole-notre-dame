// Net cost of a donation once the tax reduction rate is applied (invalid amounts count as 0).
export function computeDonationCost(amount: number, reductionRate: number): number {
  const safeAmount = Number.isFinite(amount) ? Math.max(0, amount) : 0;
  return Math.round(safeAmount * (1 - reductionRate));
}

// Share of the campaign already collected, between 0 and 1.
export function getCollectedRatio(collected: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.min(1, Math.max(0, collected / goal));
}

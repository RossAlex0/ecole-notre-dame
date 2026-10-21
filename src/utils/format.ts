const numberFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

// French grouping ("3 500"), with a regular space for consistent rendering across fonts.
export function formatNumber(value: number): string {
  return numberFormat.format(value).replace(/\s/g, " ");
}

export function formatEuros(value: number): string {
  return `${formatNumber(value)} €`;
}

// "1,23 M€" for amounts in millions.
export function formatMillionEuros(value: number): string {
  const millions = new Intl.NumberFormat("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
    value / 1_000_000,
  );
  return `${millions} M€`;
}

export function formatPercent(ratio: number): string {
  return `${Math.round(ratio * 100)} %`;
}

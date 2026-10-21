const numberFormat = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });

// French grouping ("3 500"), with a regular space for consistent rendering across fonts.
export function formatNumber(value: number): string {
  return numberFormat.format(value).replace(/\s/g, " ");
}

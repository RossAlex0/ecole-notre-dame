import { SCHOOL_NAME } from "./contact";

const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

// Public URL used for canonical links, sitemap and social previews.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelProductionUrl ? `https://${vercelProductionUrl}` : "http://localhost:3000");

export const SITE_TITLE = `${SCHOOL_NAME} | Collège indépendant, Verfeil & Balma`;

// Two lines shown under the crest on the social preview image.
export const SITE_PREVIEW = { title: "Notre-Dame de l’Aurore", subtitle: "Collège indépendant" } as const;

export const SITE_DESCRIPTION =
  "Collège indépendant de la 6ᵉ à la 3ᵉ, à Verfeil puis à Balma dès 2027 : enseignement exigeant, classes à taille humaine. Inscriptions 2027 ouvertes.";

// Mirrors the CSS tokens for places that cannot read CSS variables (theme-color, generated images).
export const BRAND_COLORS = {
  primary: "#1a4277",
  gold: "#f2c462",
  white: "#ffffff",
} as const;

export const THEME_COLOR = BRAND_COLORS.primary;

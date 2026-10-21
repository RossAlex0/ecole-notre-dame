// Legal publisher and host details for the mandatory pages (LCEN, RGPD).
// Values marked TO_COMPLETE must be provided by the school before going live.
export const TO_COMPLETE = "[À compléter]";

// Source: annuaire-entreprises.data.gouv.fr (SIREN 841036528, nature juridique 9220).
export const PUBLISHER = {
  name: "École secondaire privée hors contrat Notre-Dame de l'Aurore",
  legalForm: "association déclarée",
  registration: "SIREN 841 036 528",
  address: "3 impasse Malcousinat, 31380 Gragnague",
  publicationDirector: TO_COMPLETE,
} as const;

// To verify: two addresses are published for Vercel Inc. (Covina and Walnut, CA).
export const HOST = {
  name: "Vercel Inc.",
  address: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
  website: "https://vercel.com",
} as const;

export const DATA_PROTECTION_AUTHORITY = {
  name: "CNIL",
  website: "https://www.cnil.fr",
} as const;

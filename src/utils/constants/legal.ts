// Legal publisher and host details for the mandatory pages (LCEN, RGPD).
// Values marked TO_COMPLETE must be provided by the school before going live.
export const TO_COMPLETE = "[À compléter]";

export const PUBLISHER = {
  name: TO_COMPLETE,
  legalForm: TO_COMPLETE,
  registration: TO_COMPLETE,
  address: TO_COMPLETE,
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

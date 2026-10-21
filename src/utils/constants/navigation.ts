import { toSectionHref } from "@/utils/link";

export const SECTION_IDS = {
  top: "top",
  college: "college",
  balma: "balma",
  inscriptions: "inscriptions",
  testimonials: "confiance",
  support: "soutenir",
  contact: "contact",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const ROUTES = {
  home: "/",
  legalNotice: "/mentions-legales",
  privacy: "/politique-de-confidentialite",
} as const;

export const HOME_HREF = toSectionHref(SECTION_IDS.top);

export const LEGAL_LINKS: readonly NavLink[] = [
  { label: "Mentions légales", href: ROUTES.legalNotice },
  { label: "Politique de confidentialité", href: ROUTES.privacy },
];

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Le collège", href: toSectionHref(SECTION_IDS.college) },
  { label: "Balma 2027", href: toSectionHref(SECTION_IDS.balma) },
  { label: "Inscriptions", href: toSectionHref(SECTION_IDS.inscriptions) },
];

export const DONATE_LINK: NavLink = { label: "Faire un don", href: toSectionHref(SECTION_IDS.support) };

export const CONTACT_LINK: NavLink = { label: "Contact", href: toSectionHref(SECTION_IDS.contact) };

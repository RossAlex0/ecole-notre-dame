import { toAnchor } from "@/utils/link";

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

export const HOME_HREF = toAnchor(SECTION_IDS.top);

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Le collège", href: toAnchor(SECTION_IDS.college) },
  { label: "Balma 2027", href: toAnchor(SECTION_IDS.balma) },
  { label: "Inscriptions", href: toAnchor(SECTION_IDS.inscriptions) },
];

export const DONATE_LINK: NavLink = { label: "Faire un don", href: toAnchor(SECTION_IDS.support) };

export const CONTACT_LINK: NavLink = { label: "Contact", href: toAnchor(SECTION_IDS.contact) };

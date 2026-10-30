import { toMailHref } from "@/utils/link";
import { AGLAE_PRESIDENT, DIRECTOR } from "./contact";

export type SocialLink = {
  name: "youtube" | "instagram";
  label: string;
  href: string;
};

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { name: "youtube", label: "YouTube", href: "https://www.youtube.com/@collegenotredamedelaurore" },
  {
    name: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/collegenotredamedelaurore/",
  },
];

// Balma project film: https://www.youtube.com/watch?v=1RVvGAKl090
export const BALMA_FILM_YOUTUBE_ID = "1RVvGAKl090";

export const HELLOASSO_URL =
  "https://www.helloasso.com/associations/association-du-girou-pour-une-libre-action-educative/formulaires/6";

export const MAIL_LINKS = {
  registration: toMailHref(DIRECTOR.email, { subject: "Inscription 2027" }),
  ifiDonation: toMailHref(AGLAE_PRESIDENT.email, { subject: "Don IFI" }),
  taxReceipt: toMailHref(AGLAE_PRESIDENT.email, {
    subject: "Mes coordonnées pour le reçu fiscal",
    body: "Bonjour,\n\nVoici mes coordonnées pour recevoir mon reçu fiscal :\n\nNom et prénom : \nAdresse postale : \nE-mail : \nPortable : \n\nMerci !",
  }),
} as const;

export const DOCUMENTS = {
  rib: "/documents/rib-aglae.pdf",
} as const;

export type Credit = {
  prefix: string;
  name: string;
  href: string;
};

export const CREDITS: readonly Credit[] = [
  { prefix: "Développé par", name: "Alex Rossignol", href: "https://alex-rossignol.fr" },
  { prefix: "Design par", name: "Marlene Ayrault", href: "https://www.ayraultmarlene.fr/" },
];

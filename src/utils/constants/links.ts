import { toMailHref } from "@/utils/link";
import { DIRECTOR } from "./contact";

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

export const HELLOASSO_URL =
  "https://www.helloasso.com/associations/association-du-girou-pour-une-libre-action-educative/formulaires/6";

export const MAIL_LINKS = {
  registration: toMailHref(DIRECTOR.email, { subject: "Inscription 2027" }),
} as const;

export const DOCUMENTS = {
  rib: "/documents/rib-aglae.pdf",
} as const;

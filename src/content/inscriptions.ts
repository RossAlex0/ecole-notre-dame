import type { InscriptionsContent } from "@/types/content";
import { IMAGES } from "@/utils/constants/images";
import { MAIL_LINKS } from "@/utils/constants/links";

export const INSCRIPTIONS_CONTENT: InscriptionsContent = {
  eyebrow: "Inscriptions ouvertes",
  title: "Rejoignez",
  highlight: "l’aventure",
  paragraphs: [
    { text: "", strong: "Les inscriptions pour la rentrée 2027 sont ouvertes." },
    {
      text: "Vous souhaitez en savoir plus sur notre collège, rencontrer la directrice et échanger sur le parcours de votre enfant ?",
    },
  ],
  cta: { label: "Nous contacter", href: MAIL_LINKS.registration },
  picture: {
    image: IMAGES.inscriptions,
    alt: "Collégiens en randonnée sur un sentier de crête, une tour au loin",
    position: "center",
  },
};

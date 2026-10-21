import type { HeroContent } from "@/types/content";
import { IMAGES } from "@/utils/constants/images";
import { SECTION_IDS } from "@/utils/constants/navigation";
import { toAnchor } from "@/utils/link";

export const HERO_CONTENT: HeroContent = {
  motto: "Candor lucis aeternae",
  titleLines: ["Collège", "Notre-Dame", "de l'Aurore"],
  paragraphs: [
    {
      text: "Fondé en 2018 à Verfeil, le collège Notre-Dame de l’Aurore accueille les élèves de la 6ᵉ à la 3ᵉ dans un esprit familial, à la lumière de la foi chrétienne.",
    },
    {
      text: "Notre ambition : permettre à chaque enfant de donner le meilleur de lui-même. Un enseignement traditionnel, exigeant et structuré, des classes à taille humaine, un accompagnement personnalisé grâce aux groupes de niveau et des ateliers artistiques et manuels permettent à chacun de progresser, de prendre confiance et de développer ses talents.",
    },
    {
      text: "Trois piliers, en étroite collaboration avec les parents, pour une éducation intégrale :",
      strong: "élever l’âme, nourrir l’esprit et déployer ses talents.",
    },
  ],
  filmCta: {
    label: "2 minutes pour nous connaître",
    ariaLabel: "2 minutes pour nous connaître : voir le film du collège",
    href: toAnchor(SECTION_IDS.balma),
  },
  registrationCta: {
    label: "Inscriptions 2027",
    href: toAnchor(SECTION_IDS.inscriptions),
  },
  picture: {
    image: IMAGES.hero,
    alt: "Trois collégiennes en sortie, en pleine discussion",
    position: "30% center",
  },
};

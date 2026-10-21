import type { PillarsContent } from "@/types/content";
import { IMAGES } from "@/utils/constants/images";

// Photos are illustrative: the card title already carries the meaning, so alt stays empty.
export const PILLARS_CONTENT: PillarsContent = {
  title: "Trois piliers",
  highlight: "pour grandir",
  items: [
    {
      title: "Élever l'âme",
      text: "Chaque journée commence par la prière. La messe hebdomadaire, la vie en maisons et l'attention portée aux autres invitent chaque élève à grandir dans la foi, la confiance et la charité.",
      picture: { image: IMAGES.pillarSoul, alt: "", position: "center 40%" },
    },
    {
      title: "Nourrir l'esprit",
      text: "Des classes à taille humaine, des professeurs exigeants et attentifs, un enseignement structuré : chaque élève apprend à maîtriser la langue, à développer son raisonnement et prend goût au travail bien fait.",
      picture: { image: IMAGES.pillarMind, alt: "", position: "center 30%" },
    },
    {
      title: "Déployer ses talents",
      text: "Menuiserie, couture, dessin, chant choral, théâtre… autant d'occasions de découvrir ses talents, de développer sa créativité, de prendre confiance en soi et de goûter à la joie de créer et de se dépasser.",
      picture: { image: IMAGES.pillarTalents, alt: "", position: "45% center" },
    },
  ],
};

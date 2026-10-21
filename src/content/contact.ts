import type { ContactContent } from "@/types/content";
import { AGLAE_PRESIDENT, DIRECTOR } from "@/utils/constants/contact";
import { IMAGES } from "@/utils/constants/images";

export const CONTACT_CONTENT: ContactContent = {
  title: "Une question ?",
  highlight: "Parlons-en",
  cards: [
    { person: DIRECTOR, picture: { image: IMAGES.director, alt: DIRECTOR.name } },
    { person: AGLAE_PRESIDENT, picture: { image: IMAGES.aglaePresident, alt: AGLAE_PRESIDENT.name } },
  ],
};

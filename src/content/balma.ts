import type { BalmaContent } from "@/types/content";
import { IMAGES } from "@/utils/constants/images";

export const BALMA_CONTENT: BalmaContent = {
  title: "Cap",
  highlight: "Balma 2027",
  lede: "Après neuf années à Verfeil, Notre-Dame de l'Aurore accueillera dès septembre 2027 ses élèves à Balma, dans un cadre verdoyant, spacieux et entièrement repensé pour leur épanouissement.",
  drawing: {
    caption: "Verfeil 2018 → Balma 2027",
    annotation: "Balma, 2027",
    label: "Planche : le collège de Balma",
  },
  video: {
    picture: { image: IMAGES.balma, alt: "", position: "center" },
    playLabel: "Lancer le film du projet",
    placeholder: "Ici, la vidéo du projet (à fournir)",
  },
  keyFigures: [
    { icon: "house", value: 3500, unit: " m²", label: "de terrain" },
    { icon: "bus", value: 6, unit: " lignes", label: "de bus, et une piste cyclable" },
    { icon: "pin", value: 1, unit: " km", label: "de la rocade toulousaine" },
  ],
};

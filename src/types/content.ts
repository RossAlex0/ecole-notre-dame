import type { ImageAsset } from "@/utils/constants/images";
import type { NavLink } from "@/utils/constants/navigation";

// Paragraph with an optional emphasized ending, e.g. "… intégrale : **élever l'âme…**".
export type RichParagraph = {
  text: string;
  strong?: string;
};

export type Picture = {
  image: ImageAsset;
  alt: string;
  // CSS object-position used to keep the subject in frame.
  position?: string;
};

export type CallToAction = NavLink & {
  ariaLabel?: string;
};

export type HeroContent = {
  motto: string;
  titleLines: readonly string[];
  paragraphs: readonly RichParagraph[];
  filmCta: CallToAction;
  registrationCta: CallToAction;
  picture: Picture;
};

export type Pillar = {
  title: string;
  text: string;
  picture: Picture;
};

export type KeyFigure = {
  icon: "house" | "bus" | "pin";
  value: number;
  unit: string;
  label: string;
};

export type BalmaContent = {
  title: string;
  highlight: string;
  lede: string;
  drawing: { caption: string; annotation: string; label: string };
  video: { picture: Picture; playLabel: string; placeholder: string };
  keyFigures: readonly KeyFigure[];
};

export type InscriptionsContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  paragraphs: readonly RichParagraph[];
  cta: CallToAction;
  picture: Picture;
};

export type PillarsContent = {
  title: string;
  highlight: string;
  items: readonly Pillar[];
};

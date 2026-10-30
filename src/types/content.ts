import type { ContactPerson } from "@/utils/constants/contact";
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

export type Video = {
  title: string;
  embedUrl: string;
};

// Button opening a film in a modal player.
export type FilmCallToAction = {
  label: string;
  ariaLabel?: string;
  video: Video;
};

export type HeroContent = {
  motto: string;
  titleLines: readonly string[];
  paragraphs: readonly RichParagraph[];
  filmCta: FilmCallToAction;
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
  video: { picture: Picture; playLabel: string; title: string; embedUrl: string };
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

export type Testimonial = {
  quote: string;
  author: string;
};

export type TestimonialsContent = {
  title: string;
  highlight: string;
  items: readonly Testimonial[];
};

export type ContactCard = {
  person: ContactPerson;
  picture: Picture;
};

export type ContactContent = {
  title: string;
  highlight: string;
  cards: readonly ContactCard[];
};

// Inline rich text: plain strings, bold parts and links, rendered without added spaces.
export type TextSegment = string | { strong: string } | { label: string; href: string };

export type DonorProfile = {
  id: string;
  label: string;
  reductionRate: number;
  title: string;
  text: readonly TextSegment[];
};

export type PaymentMethod = {
  id: string;
  label: string;
  text: readonly TextSegment[];
  details?: readonly string[];
  cta?: CallToAction & { variant: "accent" | "outline-light"; external?: boolean; download?: boolean };
};

export type DonationContent = {
  title: string;
  highlight: string;
  lede: string;
  campaign: { collected: number; goal: number };
  simulator: {
    title: string;
    profilesLabel: string;
    profiles: readonly DonorProfile[];
    amountLabel: string;
    defaultAmount: number;
    resultLabel: string;
  };
  payment: { title: string; methodsLabel: string; methods: readonly PaymentMethod[] };
  receipt: { title: string; text: string; cta: CallToAction };
};

export type PillarsContent = {
  title: string;
  highlight: string;
  items: readonly Pillar[];
};

export type LegalSection = {
  title: string;
  paragraphs: readonly (readonly TextSegment[])[];
};

export type LegalPageContent = {
  title: string;
  description: string;
  updatedAt: string;
  sections: readonly LegalSection[];
};

export type ErrorContent = {
  eyebrow: string;
  title: string;
  highlight: string;
  text: string;
};

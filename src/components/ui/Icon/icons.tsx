import type { ReactNode } from "react";

export type IconDefinition = {
  viewBox?: string;
  // Filled icons use currentColor as fill; outlined ones use it as stroke.
  filled?: boolean;
  strokeWidth?: number;
  content: ReactNode;
};

// Paths taken from the "One page Atelier" mockup (24×24 viewBox).
export const ICONS = {
  menu: {
    strokeWidth: 2.2,
    content: <path d="M3 6h18M3 12h18M3 18h18" />,
  },
  youtube: {
    filled: true,
    content: (
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z" />
    ),
  },
  instagram: {
    strokeWidth: 1.8,
    content: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" />
      </>
    ),
  },
  location: {
    strokeWidth: 1.4,
    content: (
      <>
        <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </>
    ),
  },
  phone: {
    strokeWidth: 1.4,
    content: (
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    ),
  },
  mail: {
    strokeWidth: 1.4,
    content: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="1" />
        <path d="M3 6l9 7 9-7" />
      </>
    ),
  },
  play: {
    filled: true,
    content: <path d="M9 7 L17 12 L9 17 Z" />,
  },
  // Two-tone brand star: colors come from tokens, not currentColor.
  star: {
    filled: true,
    content: (
      <path
        d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"
        style={{ fill: "var(--color-gold)", stroke: "var(--color-tan)", strokeWidth: 0.8 }}
      />
    ),
  },
  // Key figure icons (32×32 viewBox, thin stroke).
  house: {
    viewBox: "0 0 32 32",
    strokeWidth: 1.2,
    content: (
      <>
        <path d="M4 15 L16 5 L28 15" />
        <path d="M7 13 V27 H25 V13" />
        <path d="M13 27 V19 H19 V27" />
        <path d="M21 8 V5 H24 V10.5" />
      </>
    ),
  },
  bus: {
    viewBox: "0 0 32 32",
    strokeWidth: 1.2,
    content: (
      <>
        <rect x="6" y="4" width="20" height="20" rx="3" />
        <path d="M6 15 H26" />
        <path d="M10 9 H22" />
        <circle cx="11" cy="19.5" r="1.3" />
        <circle cx="21" cy="19.5" r="1.3" />
        <path d="M9 24 V28 M23 24 V28" />
      </>
    ),
  },
  pin: {
    viewBox: "0 0 32 32",
    strokeWidth: 1.2,
    content: (
      <>
        <path d="M16 29 C16 29 7 20 7 13 a9 9 0 0 1 18 0 C25 20 16 29 16 29 Z" />
        <circle cx="16" cy="13" r="3.2" />
      </>
    ),
  },
  heart: {
    strokeWidth: 2,
    content: (
      <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />
    ),
  },
} as const satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof ICONS;

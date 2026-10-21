import { Archivo, IBM_Plex_Mono, La_Belle_Aurore, Playfair_Display } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const belleAurore = La_Belle_Aurore({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-belle-aurore",
  display: "swap",
});

// Only used for the testimonial opening quote glyph.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

export const fontVariables = [archivo, plexMono, belleAurore, playfair]
  .map((font) => font.variable)
  .join(" ");

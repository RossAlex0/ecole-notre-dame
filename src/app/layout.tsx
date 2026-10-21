import type { Metadata } from "next";
import { fontVariables } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Collège Notre-Dame de l'Aurore",
  description:
    "Collège catholique indépendant de la 6ᵉ à la 3ᵉ, à Verfeil puis à Balma dès septembre 2027.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={fontVariables}>
      <body>{children}</body>
    </html>
  );
}

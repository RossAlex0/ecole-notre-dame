import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SCHOOL_NAME } from "@/utils/constants/contact";
import { SECTION_IDS } from "@/utils/constants/navigation";
import { fontVariables } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: SCHOOL_NAME,
  description:
    "Collège catholique indépendant de la 6ᵉ à la 3ᵉ, à Verfeil puis à Balma dès septembre 2027.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={fontVariables}>
      <body>
        <Header />
        <main id={SECTION_IDS.top}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

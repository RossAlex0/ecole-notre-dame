import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { StructuredData } from "@/components/layout/StructuredData";
import { SCHOOL_NAME } from "@/utils/constants/contact";
import { SECTION_IDS } from "@/utils/constants/navigation";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_TITLE, SITE_URL, THEME_COLOR } from "@/utils/constants/site";
import { fontVariables } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SCHOOL_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SCHOOL_NAME,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: SCHOOL_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={fontVariables}>
      <body>
        <SkipLink targetId={SECTION_IDS.top} />
        <Header />
        <main id={SECTION_IDS.top} tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <StructuredData />
      </body>
    </html>
  );
}

import { SCHOOL, SCHOOL_NAME } from "@/utils/constants/contact";
import { IMAGES } from "@/utils/constants/images";
import { SOCIAL_LINKS } from "@/utils/constants/links";
import { SITE_DESCRIPTION, SITE_URL } from "@/utils/constants/site";

// schema.org School data so search engines can show the school's details.
export function buildSchoolJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "School",
    name: SCHOOL_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: new URL(IMAGES.logo.src, SITE_URL).toString(),
    image: new URL(IMAGES.hero.src, SITE_URL).toString(),
    telephone: SCHOOL.phone,
    email: SCHOOL.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SCHOOL.postalAddress.street,
      postalCode: SCHOOL.postalAddress.postalCode,
      addressLocality: SCHOOL.postalAddress.city,
      addressCountry: SCHOOL.postalAddress.country,
    },
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
}

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: all values come from our own constants.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchoolJsonLd()) }}
    />
  );
}

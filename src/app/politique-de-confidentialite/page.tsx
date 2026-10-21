import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks/LegalPage";
import { Section } from "@/components/ui/Section";
import { PRIVACY_CONTENT } from "@/content/legal";
import { ROUTES } from "@/utils/constants/navigation";

export const metadata: Metadata = {
  title: PRIVACY_CONTENT.title,
  description: PRIVACY_CONTENT.description,
  alternates: { canonical: ROUTES.privacy },
};

export default function PrivacyPage() {
  return (
    <Section>
      <LegalPage content={PRIVACY_CONTENT} />
    </Section>
  );
}

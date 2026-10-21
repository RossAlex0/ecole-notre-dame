import type { Metadata } from "next";
import { LegalPage } from "@/components/blocks/LegalPage";
import { Section } from "@/components/ui/Section";
import { LEGAL_NOTICE_CONTENT } from "@/content/legal";
import { ROUTES } from "@/utils/constants/navigation";

export const metadata: Metadata = {
  title: LEGAL_NOTICE_CONTENT.title,
  description: LEGAL_NOTICE_CONTENT.description,
  alternates: { canonical: ROUTES.legalNotice },
};

export default function LegalNoticePage() {
  return (
    <Section>
      <LegalPage content={LEGAL_NOTICE_CONTENT} />
    </Section>
  );
}

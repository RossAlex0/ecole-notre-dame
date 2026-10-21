import type { Metadata } from "next";
import { ErrorState } from "@/components/blocks/ErrorState";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ERROR_ACTIONS, NOT_FOUND_CONTENT } from "@/content/errors";
import { ROUTES } from "@/utils/constants/navigation";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section background="paper">
      <ErrorState
        content={NOT_FOUND_CONTENT}
        actions={<Button href={ROUTES.home}>{ERROR_ACTIONS.home}</Button>}
      />
    </Section>
  );
}

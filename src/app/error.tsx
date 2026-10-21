"use client";

import { ErrorState } from "@/components/blocks/ErrorState";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { ERROR_ACTIONS, ERROR_CONTENT } from "@/content/errors";
import { ROUTES } from "@/utils/constants/navigation";

export type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <Section background="paper">
      <ErrorState
        content={ERROR_CONTENT}
        actions={
          <>
            <Button onClick={reset}>{ERROR_ACTIONS.retry}</Button>
            <Button href={ROUTES.home} variant="outline">
              {ERROR_ACTIONS.home}
            </Button>
          </>
        }
      />
    </Section>
  );
}

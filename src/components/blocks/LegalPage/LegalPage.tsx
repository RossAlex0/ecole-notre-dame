import { RichText } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Text";
import type { LegalPageContent } from "@/types/content";
import styles from "./LegalPage.module.css";

export type LegalPageProps = {
  content: LegalPageContent;
};

export function LegalPage({ content }: LegalPageProps) {
  return (
    <article className={styles.legal}>
      <SectionHeading title={content.title} level={1} />
      <Text variant="mono" size="xs" color="muted">
        Dernière mise à jour : {content.updatedAt}
      </Text>

      {content.sections.map((section) => (
        <section key={section.title} className={styles.section}>
          <Text as="h2" variant="heading" size="lg">
            {section.title}
          </Text>
          {section.paragraphs.map((segments, index) => (
            <Text key={index} size="md" color="muted">
              <RichText segments={segments} />
            </Text>
          ))}
        </section>
      ))}
    </article>
  );
}

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Text";
import type { ContactContent } from "@/types/content";
import { toMailHref, toTelHref } from "@/utils/link";
import styles from "./Contact.module.css";

export type ContactProps = {
  content: ContactContent;
};

export function Contact({ content }: ContactProps) {
  return (
    <>
      <SectionHeading title={content.title} highlight={content.highlight} className={styles.heading} />

      <ul className={styles.cards}>
        {content.cards.map(({ person, picture }) => (
          <li key={person.email} className={styles.card}>
            <Image
              src={picture.image.src}
              alt={picture.alt}
              width={picture.image.width}
              height={picture.image.height}
              sizes="124px"
              className={styles.photo}
            />
            <div className={styles.body}>
              <Text as="h3" variant="heading" size="lg">
                {person.name}
              </Text>
              <Text size="md" color="muted">
                {person.role}
              </Text>
              <a href={toTelHref(person.phone)} className={styles.link}>
                <Icon name="phone" size={18} />
                {person.phone}
              </a>
              <a href={toMailHref(person.email)} className={styles.link}>
                <Icon name="mail" size={18} />
                {person.email}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

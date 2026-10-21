import { Brand } from "@/components/layout/Brand";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { FOOTER_CONTENT } from "@/content/footer";
import { SCHOOL } from "@/utils/constants/contact";
import { CREDITS, SOCIAL_LINKS } from "@/utils/constants/links";
import { LEGAL_LINKS } from "@/utils/constants/navigation";
import { EXTERNAL_LINK_PROPS, toMailHref, toTelHref } from "@/utils/link";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.band}>
        <Container className={styles.bandInner}>
          <Text
            as="span"
            variant="mono"
            color="accent-dark"
            className={styles.badge}
          >
            <Icon name="heart" size={15} />
            {FOOTER_CONTENT.followLabel}
          </Text>

          <Text size="md" color="white" className={styles.tagline}>
            {FOOTER_CONTENT.followTagline}
          </Text>

          <div className={styles.socials}>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={styles.social}
                {...EXTERNAL_LINK_PROPS}
              >
                <Icon name={link.name} size={22} />
                {link.label}
              </a>
            ))}
          </div>
        </Container>
      </div>

      <Container className={styles.main}>
        <Brand size="lg" color="on-dark" className={styles.brand} />

        <address className={styles.coords}>
          <span className={styles.coord}>
            <Icon name="location" size={16} />
            <span>
              {SCHOOL.address}{" "}
              <span className={styles.note}>· {SCHOOL.addressNote}</span>
            </span>
          </span>
          <a href={toTelHref(SCHOOL.phone)} className={styles.coord}>
            <Icon name="phone" size={16} />
            {SCHOOL.phone}
          </a>
          <a href={toMailHref(SCHOOL.email)} className={styles.coord}>
            <Icon name="mail" size={16} />
            {SCHOOL.email}
          </a>
        </address>

        <div className={styles.bottom}>
          <nav aria-label="Informations légales" className={styles.inline}>
            {LEGAL_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <p className={styles.inline}>
            {CREDITS.map((credit) => (
              <span key={credit.href}>
                {credit.prefix}{" "}
                <a href={credit.href} {...EXTERNAL_LINK_PROPS}>
                  {credit.name}
                </a>
              </span>
            ))}
          </p>
        </div>
      </Container>
    </footer>
  );
}

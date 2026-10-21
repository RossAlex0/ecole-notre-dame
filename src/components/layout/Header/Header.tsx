import { Brand } from "@/components/layout/Brand";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  CONTACT_LINK,
  DONATE_LINK,
  HOME_HREF,
  NAV_LINKS,
} from "@/utils/constants/navigation";
import { cn } from "@/utils/cn";
import styles from "./Header.module.css";

const MOBILE_LINKS = [...NAV_LINKS, DONATE_LINK, CONTACT_LINK];

export function Header() {
  return (
    <header className={styles.header}>
      <ScrollProgress />
      <Container className={styles.bar}>
        <Brand href={HOME_HREF} className={styles.brand} />

        <nav aria-label="Sections" className={cn(styles.links, styles.desktopOnly)}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>

        <Button href={DONATE_LINK.href} variant="accent" size="sm" className={styles.cta}>
          {DONATE_LINK.label}
        </Button>

        <a href={CONTACT_LINK.href} className={cn(styles.link, styles.desktopOnly)}>
          {CONTACT_LINK.label}
        </a>

        <MobileMenu links={MOBILE_LINKS} className={styles.mobileOnly} />
      </Container>
    </header>
  );
}

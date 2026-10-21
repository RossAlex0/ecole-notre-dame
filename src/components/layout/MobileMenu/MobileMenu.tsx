"use client";

import { useEffect, useId, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import type { NavLink } from "@/utils/constants/navigation";
import styles from "./MobileMenu.module.css";

export type MobileMenuProps = {
  links: readonly NavLink[];
  className?: string;
};

export function MobileMenu({ links, className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const drawerId = useId();
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <div className={className}>
      <button
        type="button"
        className={styles.burger}
        aria-label="Menu"
        aria-expanded={isOpen}
        aria-controls={drawerId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <Icon name="menu" size={20} />
      </button>

      <nav id={drawerId} aria-label="Menu mobile" hidden={!isOpen} className={styles.drawer}>
        <Container className={styles.list}>
          {links.map((link) => (
            <a key={link.href} href={link.href} className={styles.link} onClick={close}>
              {link.label}
            </a>
          ))}
        </Container>
      </nav>
    </div>
  );
}

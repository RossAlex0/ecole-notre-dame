import { Balma } from "@/components/blocks/Balma";
import { Contact } from "@/components/blocks/Contact";
import { Hero } from "@/components/blocks/Hero";
import { Inscriptions } from "@/components/blocks/Inscriptions";
import { Pillars } from "@/components/blocks/Pillars";
import { Testimonials } from "@/components/blocks/Testimonials";
import { Section } from "@/components/ui/Section";
import { BALMA_CONTENT } from "@/content/balma";
import { CONTACT_CONTENT } from "@/content/contact";
import { HERO_CONTENT } from "@/content/hero";
import { INSCRIPTIONS_CONTENT } from "@/content/inscriptions";
import { PILLARS_CONTENT } from "@/content/pillars";
import { TESTIMONIALS_CONTENT } from "@/content/testimonials";
import { SECTION_IDS } from "@/utils/constants/navigation";

export default function Home() {
  return (
    <>
      <Section id={SECTION_IDS.college} background="paper">
        <Hero content={HERO_CONTENT} />
        <Pillars content={PILLARS_CONTENT} />
      </Section>
      <Section id={SECTION_IDS.balma} background="primary">
        <Balma content={BALMA_CONTENT} />
      </Section>
      <Section id={SECTION_IDS.inscriptions} background="paper">
        <Inscriptions content={INSCRIPTIONS_CONTENT} />
      </Section>
      <Section id={SECTION_IDS.testimonials}>
        <Testimonials content={TESTIMONIALS_CONTENT} />
      </Section>
      <Section id={SECTION_IDS.contact}>
        <Contact content={CONTACT_CONTENT} />
      </Section>
    </>
  );
}

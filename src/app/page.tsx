import { Hero } from "@/components/blocks/Hero";
import { Pillars } from "@/components/blocks/Pillars";
import { Section } from "@/components/ui/Section";
import { HERO_CONTENT } from "@/content/hero";
import { PILLARS_CONTENT } from "@/content/pillars";
import { SECTION_IDS } from "@/utils/constants/navigation";

export default function Home() {
  return (
    <Section id={SECTION_IDS.college} background="paper">
      <Hero content={HERO_CONTENT} />
      <Pillars content={PILLARS_CONTENT} />
    </Section>
  );
}

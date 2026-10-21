import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SCHOOL_NAME } from "@/utils/constants/contact";

// Temporary placeholder until the page blocks are built.
export default function Home() {
  return (
    <Container>
      <SectionHeading title={SCHOOL_NAME} level={1} />
    </Container>
  );
}

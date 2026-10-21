import { Text } from "@/components/ui/Text";
import type { TextProps } from "@/components/ui/Text";
import type { RichParagraph as RichParagraphContent } from "@/types/content";

export type RichParagraphProps = Omit<TextProps, "children" | "as"> & {
  paragraph: RichParagraphContent;
};

// Paragraph whose optional ending is emphasized in bold.
export function RichParagraph({ paragraph, ...textProps }: RichParagraphProps) {
  return (
    <Text {...textProps}>
      {paragraph.text}
      {paragraph.text && paragraph.strong && " "}
      {paragraph.strong && <strong>{paragraph.strong}</strong>}
    </Text>
  );
}

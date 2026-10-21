import type { TextSegment } from "@/types/content";

export type RichTextProps = {
  segments: readonly TextSegment[];
};

// Renders text segments in order; spacing is part of the strings themselves.
export function RichText({ segments }: RichTextProps) {
  return segments.map((segment, index) => {
    if (typeof segment === "string") return segment;
    if ("strong" in segment) return <strong key={index}>{segment.strong}</strong>;
    return (
      <a key={index} href={segment.href}>
        {segment.label}
      </a>
    );
  });
}

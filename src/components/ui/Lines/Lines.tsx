import { Fragment } from "react";

export type LinesProps = {
  lines: readonly string[];
};

// Renders text lines separated by <br />, e.g. a title split over several lines.
export function Lines({ lines }: LinesProps) {
  return lines.map((line, index) => (
    <Fragment key={`${index}-${line}`}>
      {index > 0 && <br />}
      {line}
    </Fragment>
  ));
}

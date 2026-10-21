import { ICONS } from "./icons";
import type { IconDefinition, IconName } from "./icons";

export type IconProps = {
  name: IconName;
  size?: number;
  // When provided the icon is announced to assistive technologies; otherwise it is decorative.
  label?: string;
  className?: string;
};

export function Icon({ name, size = 24, label, className }: IconProps) {
  const { viewBox = "0 0 24 24", filled, strokeWidth, content }: IconDefinition = ICONS[name];
  const a11yProps = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };

  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? undefined : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...a11yProps}
    >
      {content}
    </svg>
  );
}

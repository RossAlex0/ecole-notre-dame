import { Fragment } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { Text } from "@/components/ui/Text";
import type { TextColor } from "@/components/ui/Text";
import { SCHOOL } from "@/utils/constants/contact";
import { IMAGES } from "@/utils/constants/images";
import { cn } from "@/utils/cn";
import styles from "./Brand.module.css";

const LOGO_WIDTHS = {
  md: 64,
  lg: 124,
} as const;

export type BrandSize = keyof typeof LOGO_WIDTHS;

export type BrandProps = {
  href?: string;
  size?: BrandSize;
  color?: TextColor;
  className?: string;
};

export function Brand({ href, size = "md", color = "primary", className }: BrandProps) {
  const logoWidth = LOGO_WIDTHS[size];
  const wrapperProps = {
    className: cn(styles.brand, className),
    style: { "--_logo-width": `${logoWidth}px` } as CSSProperties,
  };

  const content = (
    <>
      <Image
        src={IMAGES.logo.src}
        width={IMAGES.logo.width}
        height={IMAGES.logo.height}
        sizes={`${logoWidth}px`}
        alt=""
        className={styles.logo}
      />
      <Text as="span" variant="display" size="sm" color={color} className={styles.name}>
        {SCHOOL.nameLines.map((line, index) => (
          <Fragment key={line}>
            {index > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </Text>
    </>
  );

  return href ? (
    <a href={href} {...wrapperProps}>
      {content}
    </a>
  ) : (
    <div {...wrapperProps}>{content}</div>
  );
}

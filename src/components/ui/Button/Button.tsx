import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "accent" | "outline" | "outline-light";
export type ButtonSize = "md" | "sm";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = BaseProps & {
  href: string;
  external?: boolean;
};

type NativeButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
  };

export type ButtonProps = LinkButtonProps | NativeButtonProps;

export function Button({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  // "md" is the base style, so it has no dedicated class.
  const classes = cn(styles.button, styles[variant], size !== "md" && styles[size], className);
  const content = (
    <>
      {icon && (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </>
  );

  if (rest.href !== undefined) {
    const externalProps = rest.external ? { target: "_blank", rel: "noopener noreferrer" } : {};

    return (
      <a href={rest.href} className={classes} {...externalProps}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = rest;

  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}

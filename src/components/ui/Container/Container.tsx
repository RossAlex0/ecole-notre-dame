import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import styles from "./Container.module.css";

type ContainerElement = "div" | "section" | "header" | "footer" | "nav" | "main" | "article";

export type ContainerProps = {
  as?: ContainerElement;
  className?: string;
  children: ReactNode;
};

export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return <Tag className={cn(styles.container, className)}>{children}</Tag>;
}

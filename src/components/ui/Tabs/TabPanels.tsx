import type { ReactNode } from "react";
import { cn } from "@/utils/cn";
import { getTabId, getTabPanelId } from "./Tabs";
import styles from "./Tabs.module.css";

export type TabPanelsProps<T extends { id: string }> = {
  items: readonly T[];
  selectedId: string;
  idPrefix: string;
  renderPanel: (item: T) => ReactNode;
  className?: string;
  panelClassName?: string;
};

// Panels are stacked in the same grid cell so the block keeps the height of the tallest one.
export function TabPanels<T extends { id: string }>({
  items,
  selectedId,
  idPrefix,
  renderPanel,
  className,
  panelClassName,
}: TabPanelsProps<T>) {
  return (
    <div className={cn(styles.panels, className)}>
      {items.map((item) => (
        <div
          key={item.id}
          id={getTabPanelId(idPrefix, item.id)}
          role="tabpanel"
          aria-labelledby={getTabId(idPrefix, item.id)}
          className={cn(styles.panel, panelClassName)}
          data-active={item.id === selectedId}
        >
          {renderPanel(item)}
        </div>
      ))}
    </div>
  );
}

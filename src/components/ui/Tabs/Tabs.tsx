"use client";

import type { KeyboardEvent } from "react";
import { cn } from "@/utils/cn";
import styles from "./Tabs.module.css";

export type TabItem = {
  id: string;
  label: string;
};

export type TabsProps = {
  items: readonly TabItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  label: string;
  // Prefix used to link each tab to its panel: `${idPrefix}-${id}-panel`.
  idPrefix: string;
  tone?: "light" | "dark";
  className?: string;
};

export const getTabPanelId = (idPrefix: string, id: string) => `${idPrefix}-${id}-panel`;
export const getTabId = (idPrefix: string, id: string) => `${idPrefix}-${id}-tab`;

// Segmented tabs: arrow keys move between tabs (WAI-ARIA tabs pattern).
export function Tabs({ items, selectedId, onSelect, label, idPrefix, tone = "light", className }: TabsProps) {
  const onKeyDown = (event: KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!step || items.length === 0) return;
    event.preventDefault();
    const current = items.findIndex((item) => item.id === selectedId);
    const next = items[(current + step + items.length) % items.length];
    onSelect(next.id);
    document.getElementById(getTabId(idPrefix, next.id))?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className={cn(styles.tabs, styles[tone], className)}
      style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
      onKeyDown={onKeyDown}
    >
      {items.map((item) => {
        const selected = item.id === selectedId;
        return (
          <button
            key={item.id}
            id={getTabId(idPrefix, item.id)}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={getTabPanelId(idPrefix, item.id)}
            tabIndex={selected ? 0 : -1}
            className={styles.tab}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

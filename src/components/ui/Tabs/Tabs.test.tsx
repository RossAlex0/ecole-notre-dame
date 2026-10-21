import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { TabPanels } from "./TabPanels";
import { Tabs } from "./Tabs";

const ITEMS = [
  { id: "online", label: "En ligne" },
  { id: "transfer", label: "Virement" },
  { id: "check", label: "Chèque" },
];

function Harness({ tone }: { tone?: "light" | "dark" }) {
  const [selected, setSelected] = useState("online");
  return (
    <>
      <Tabs items={ITEMS} selectedId={selected} onSelect={setSelected} label="Moyen de paiement" idPrefix="pay" tone={tone} />
      <TabPanels items={ITEMS} selectedId={selected} idPrefix="pay" renderPanel={(item) => `Panneau ${item.label}`} />
    </>
  );
}

const selectedTab = () => screen.getAllByRole("tab").find((tab) => tab.getAttribute("aria-selected") === "true");

describe("Tabs", () => {
  describe("defaults", () => {
    it("renders a light tablist with the first tab selected and its panel visible", () => {
      render(<Harness />);

      expect(screen.getByRole("tablist", { name: "Moyen de paiement" })).toHaveClass("light");
      expect(selectedTab()).toHaveTextContent("En ligne");
      expect(document.querySelector("[role=tabpanel][data-active=true]")).toHaveTextContent("Panneau En ligne");
    });

    it("links each tab to its panel", () => {
      render(<Harness />);
      const tab = screen.getByRole("tab", { name: "En ligne" });

      expect(document.getElementById(tab.getAttribute("aria-controls")!)).toHaveAttribute("aria-labelledby", tab.id);
    });
  });

  describe("usage", () => {
    it("switches panel on click", () => {
      render(<Harness tone="dark" />);
      fireEvent.click(screen.getByRole("tab", { name: "Virement" }));

      expect(selectedTab()).toHaveTextContent("Virement");
      expect(screen.getByText("Panneau Virement").closest("[role=tabpanel]")).toHaveAttribute("data-active", "true");
      expect(screen.getByRole("tablist")).toHaveClass("dark");
    });

    it("moves selection and focus with the arrow keys", () => {
      render(<Harness />);
      fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });

      expect(selectedTab()).toHaveTextContent("Virement");
      expect(document.activeElement).toBe(screen.getByRole("tab", { name: "Virement" }));
    });
  });

  describe("edge cases", () => {
    it("wraps from the first tab to the last with ArrowLeft", () => {
      render(<Harness />);
      fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowLeft" });

      expect(selectedTab()).toHaveTextContent("Chèque");
    });

    it("keeps only the selected tab in the tab order", () => {
      render(<Harness />);

      expect(screen.getAllByRole("tab").map((tab) => tab.tabIndex)).toEqual([0, -1, -1]);
    });

    it("keeps inactive panels mounted (stable height) but marked inactive", () => {
      const { container } = render(<Harness />);

      expect(container.querySelectorAll("[role=tabpanel][data-active=false]")).toHaveLength(2);
    });
  });
});

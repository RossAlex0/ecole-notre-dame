import { fireEvent, render, screen, within } from "@testing-library/react";
import { setReducedMotion, triggerIntersection } from "../../../../jest.setup";
import { Donation } from "./Donation";
import { DONATION_CONTENT } from "@/content/donation";
import { DOCUMENTS, HELLOASSO_URL, MAIL_LINKS } from "@/utils/constants/links";

const renderDonation = () => render(<Donation content={DONATION_CONTENT} />);
const getChart = () => screen.getByRole("figure");
const getCost = () => screen.getByText(/€$/, { selector: "b" });
const getAmount = () => screen.getByLabelText(DONATION_CONTENT.simulator.amountLabel);
const getTablist = (name: string) => screen.getByRole("tablist", { name });
const getActivePanel = (tablist: string) => {
  const tab = within(getTablist(tablist)).getAllByRole("tab").find((t) => t.getAttribute("aria-selected") === "true")!;
  return document.getElementById(tab.getAttribute("aria-controls")!)!;
};

describe("Donation", () => {
  describe("defaults", () => {
    it("renders the dark heading and the collection chart computed from the campaign", () => {
      renderDonation();

      expect(screen.getByRole("heading", { level: 2, name: "Ensemble, construisons leur avenir" })).toBeInTheDocument();
      expect(getChart()).toHaveAttribute(
        "aria-label",
        "Avancement de la collecte : 1,23 M€ déjà réunis sur 1,45 M€, soit 85 %. Il reste 220 000 € à collecter, soit 15 %.",
      );
    });

    it("simulates a 1 000 € donation for an individual by default (340 €)", () => {
      renderDonation();

      expect(getAmount()).toHaveValue(1000);
      expect(getCost()).toHaveTextContent("340 €");
      expect(getActivePanel("Je donne en tant que")).toHaveTextContent("Vous êtes un particulier");
    });

    it("shows online payment first", () => {
      renderDonation();

      expect(within(getActivePanel("Moyen de paiement")).getByRole("link", { name: "Donner en ligne" })).toHaveAttribute(
        "href",
        HELLOASSO_URL,
      );
    });
  });

  describe("usage", () => {
    it("recomputes the cost for a company and a new amount", () => {
      renderDonation();
      fireEvent.click(screen.getByRole("tab", { name: "Entreprise" }));
      fireEvent.change(getAmount(), { target: { value: "2000" } });

      expect(getCost()).toHaveTextContent("800 €");
      expect(screen.getByText(/\(60 %\)/)).toBeInTheDocument();
    });

    it("offers the IFI contact link built from the constants", () => {
      renderDonation();
      fireEvent.click(screen.getByRole("tab", { name: "IFI" }));

      expect(within(getActivePanel("Je donne en tant que")).getByRole("link", { name: "Contactez-nous" })).toHaveAttribute(
        "href",
        MAIL_LINKS.ifiDonation,
      );
    });

    it("shows bank details and a RIB download for transfers", () => {
      renderDonation();
      fireEvent.click(screen.getByRole("tab", { name: "Virement" }));
      const panel = getActivePanel("Moyen de paiement");

      expect(panel).toHaveTextContent("IBAN FR20 2004 1010 1615 4104 7T03 758");
      expect(within(panel).getByRole("link", { name: "Télécharger le RIB" })).toHaveAttribute("href", DOCUMENTS.rib);
      expect(within(panel).getByRole("link", { name: "Télécharger le RIB" })).toHaveAttribute("download");
    });

    it("links the tax receipt step to the prefilled email", () => {
      renderDonation();

      expect(screen.getByRole("link", { name: "Laisser mes coordonnées" })).toHaveAttribute("href", MAIL_LINKS.taxReceipt);
    });
  });

  describe("edge cases", () => {
    it("shows a 0 € cost for an empty or negative amount", () => {
      renderDonation();
      fireEvent.change(getAmount(), { target: { value: "" } });
      expect(getCost()).toHaveTextContent("0 €");

      fireEvent.change(getAmount(), { target: { value: "-100" } });
      expect(getCost()).toHaveTextContent("0 €");
    });

    it("renders the cheque address without extra space before the beneficiary", () => {
      renderDonation();
      fireEvent.click(screen.getByRole("tab", { name: "Chèque" }));

      expect(getActivePanel("Moyen de paiement").textContent).toContain("À l'ordre d'AGLAE, à adresser à :");
    });

    it("draws the gold share only once the chart is in view, and statically with reduced motion", () => {
      const { unmount } = renderDonation();
      expect(getChart()).toHaveClass("animated");
      triggerIntersection();
      expect(getChart()).toHaveClass("run");
      unmount();

      setReducedMotion(true);
      renderDonation();
      expect(getChart()).not.toHaveClass("animated");
    });

    it("adapts the chart to another campaign", () => {
      render(<Donation content={{ ...DONATION_CONTENT, campaign: { collected: 500_000, goal: 1_000_000 } }} />);

      expect(getChart().getAttribute("aria-label")).toContain("soit 50 %");
    });
  });
});

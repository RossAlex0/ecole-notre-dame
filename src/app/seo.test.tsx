import { readFileSync } from "node:fs";
import path from "node:path";
import { render, screen } from "@testing-library/react";
import { ErrorState } from "@/components/blocks/ErrorState";
import { LegalPage } from "@/components/blocks/LegalPage";
import { SkipLink } from "@/components/layout/SkipLink";
import { buildSchoolJsonLd } from "@/components/layout/StructuredData";
import { NOT_FOUND_CONTENT } from "@/content/errors";
import { LEGAL_NOTICE_CONTENT, PRIVACY_CONTENT } from "@/content/legal";
import { SCHOOL } from "@/utils/constants/contact";
import { LEGAL_LINKS, ROUTES } from "@/utils/constants/navigation";
import { BRAND_COLORS, SITE_DESCRIPTION, SITE_PREVIEW, SITE_TITLE, SITE_URL } from "@/utils/constants/site";
import robots from "./robots";
import sitemap from "./sitemap";

const tokens = readFileSync(path.join(process.cwd(), "src/styles/tokens.css"), "utf8");

describe("SEO", () => {
  describe("defaults", () => {
    it("falls back to localhost when no site URL is configured", () => {
      expect(SITE_URL).toBe("http://localhost:3000");
    });

    it("allows every crawler and points to the sitemap", () => {
      expect(robots()).toEqual({
        rules: { userAgent: "*", allow: "/" },
        sitemap: "http://localhost:3000/sitemap.xml",
      });
    });
  });

  describe("usage", () => {
    it("lists the home page and both legal pages in the sitemap", () => {
      const urls = sitemap().map((entry) => entry.url);

      expect(urls).toEqual(Object.values(ROUTES).map((route) => new URL(route, SITE_URL).toString()));
      expect(sitemap()[0].priority).toBe(1);
    });

    it("describes the school with schema.org data built from the constants", () => {
      const jsonLd = buildSchoolJsonLd();

      expect(jsonLd["@type"]).toBe("School");
      expect(jsonLd.address.streetAddress).toBe(SCHOOL.postalAddress.street);
      expect(`${jsonLd.address.streetAddress}, ${jsonLd.address.postalCode} ${jsonLd.address.addressLocality}`).toBe(
        SCHOOL.address,
      );
      expect(jsonLd.logo).toBe("http://localhost:3000/images/logo.png");
    });

    it("presents the school as independent in titles, description and preview image", () => {
      [SITE_TITLE, SITE_DESCRIPTION, SITE_PREVIEW.subtitle].forEach((text) => {
        expect(text).toContain("Collège indépendant");
        expect(text).not.toMatch(/catholique/i);
      });
    });
  });

  describe("edge cases", () => {
    it("keeps the hard-coded brand colors in sync with the CSS tokens", () => {
      expect(tokens).toContain(`--color-primary: ${BRAND_COLORS.primary};`);
      expect(tokens).toContain(`--color-gold: ${BRAND_COLORS.gold};`);
      expect(tokens).toContain(`--color-white: ${BRAND_COLORS.white};`);
    });

    it("produces valid JSON for the structured data script", () => {
      expect(() => JSON.parse(JSON.stringify(buildSchoolJsonLd()))).not.toThrow();
    });
  });
});

describe("Accessibility and pages", () => {
  describe("defaults", () => {
    it("renders a skip link to the main content", () => {
      render(<SkipLink targetId="top" />);

      expect(screen.getByRole("link", { name: "Aller au contenu principal" })).toHaveAttribute("href", "#top");
    });
  });

  describe("usage", () => {
    it("renders the 404 page as an h1 with its actions", () => {
      render(<ErrorState content={NOT_FOUND_CONTENT} actions={<button type="button">Retour</button>} />);

      expect(screen.getByRole("heading", { level: 1, name: "Page introuvable" })).toBeInTheDocument();
      expect(screen.getByText("Erreur 404")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Retour" })).toBeInTheDocument();
    });

    it.each([LEGAL_NOTICE_CONTENT, PRIVACY_CONTENT])("renders the $title page with an h1 and h2 sections", (content) => {
      render(<LegalPage content={content} />);

      expect(screen.getByRole("heading", { level: 1, name: content.title })).toBeInTheDocument();
      expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(content.sections.length);
    });
  });

  describe("edge cases", () => {
    it("links the footer legal pages to existing routes", () => {
      expect(LEGAL_LINKS.map((link) => link.href)).toEqual([ROUTES.legalNotice, ROUTES.privacy]);
    });

    it("renders the CNIL complaint link in the privacy policy", () => {
      render(<LegalPage content={PRIVACY_CONTENT} />);

      expect(screen.getByRole("link", { name: "https://www.cnil.fr" })).toHaveAttribute("href", "https://www.cnil.fr");
    });
  });
});

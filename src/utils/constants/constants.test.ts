import { existsSync } from "node:fs";
import path from "node:path";
import { HERO_CONTENT } from "@/content/hero";
import { SCHOOL, SCHOOL_NAME } from "./contact";
import { IMAGES } from "./images";
import { DOCUMENTS, SOCIAL_LINKS } from "./links";
import { CONTACT_LINK, DONATE_LINK, HOME_HREF, NAV_LINKS, SECTION_IDS } from "./navigation";

const publicPath = (src: string) => path.join(process.cwd(), "public", src);
const sectionAnchors = Object.values(SECTION_IDS).map((id) => `/#${id}`);

describe("constants", () => {
  describe("defaults", () => {
    it("derives the school name from its display lines", () => {
      expect(SCHOOL_NAME).toBe("Collège Notre-Dame de l'Aurore");
    });

    it("points the home link to the top anchor", () => {
      expect(HOME_HREF).toBe("/#top");
    });
  });

  describe("usage", () => {
    it("exposes the three mockup navigation links in order", () => {
      expect(NAV_LINKS.map((link) => link.label)).toEqual(["Le collège", "Balma 2027", "Inscriptions"]);
    });

    it("targets existing section ids from every internal link", () => {
      const contentLinks = [HERO_CONTENT.registrationCta];

      [...NAV_LINKS, DONATE_LINK, CONTACT_LINK, ...contentLinks].forEach((link) => {
        expect(sectionAnchors).toContain(link.href);
      });
    });

    it("uses https for every social link", () => {
      SOCIAL_LINKS.forEach((link) => expect(link.href).toMatch(/^https:\/\//));
    });
  });

  describe("edge cases", () => {
    it.each(Object.entries(IMAGES))("finds the %s image file in public/", (_, image) => {
      expect(existsSync(publicPath(image.src))).toBe(true);
    });

    it("finds the RIB document in public/", () => {
      expect(existsSync(publicPath(DOCUMENTS.rib))).toBe(true);
    });

    it("has no duplicate section ids", () => {
      const ids = Object.values(SECTION_IDS);

      expect(new Set(ids).size).toBe(ids.length);
    });

    it("keeps the school name on at least one line", () => {
      expect(SCHOOL.nameLines.length).toBeGreaterThan(0);
    });
  });
});

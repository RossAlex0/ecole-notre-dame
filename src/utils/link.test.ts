import { toSectionHref, toMailHref, toTelHref } from "./link";

describe("toSectionHref", () => {
  describe("defaults", () => {
    it("prefixes the id with the home path and a hash", () => {
      expect(toSectionHref("contact")).toBe("/#contact");
    });
  });

  describe("usage", () => {
    it("builds the donate section anchor", () => {
      expect(toSectionHref("soutenir")).toBe("/#soutenir");
    });
  });

  describe("edge cases", () => {
    it("points to the home page top for an empty id", () => {
      expect(toSectionHref("")).toBe("/#");
    });
  });
});

describe("toTelHref", () => {
  describe("defaults", () => {
    it("converts a French number to the +33 international format", () => {
      expect(toTelHref("0675080146")).toBe("tel:+33675080146");
    });
  });

  describe("usage", () => {
    it("handles the spaced display format used on the site", () => {
      expect(toTelHref("06 75 08 01 46")).toBe("tel:+33675080146");
    });
  });

  describe("edge cases", () => {
    it("keeps an already international number", () => {
      expect(toTelHref("+33 6 75 08 01 46")).toBe("tel:+33675080146");
    });

    it("strips dots and dashes", () => {
      expect(toTelHref("06.75-08.01.46")).toBe("tel:+33675080146");
    });
  });
});

describe("toMailHref", () => {
  describe("defaults", () => {
    it("returns a plain mailto without options", () => {
      expect(toMailHref("nddelaurore@gmail.com")).toBe("mailto:nddelaurore@gmail.com");
    });
  });

  describe("usage", () => {
    it("encodes the registration subject from the mockup", () => {
      expect(toMailHref("direction.ndda@gmail.com", { subject: "Inscription 2027" })).toBe(
        "mailto:direction.ndda@gmail.com?subject=Inscription%202027",
      );
    });

    it("encodes subject and multi-line body", () => {
      expect(toMailHref("a@b.fr", { subject: "Reçu fiscal", body: "Bonjour,\nNom :" })).toBe(
        "mailto:a@b.fr?subject=Re%C3%A7u%20fiscal&body=Bonjour%2C%0ANom%20%3A",
      );
    });
  });

  describe("edge cases", () => {
    it("ignores empty subject and body", () => {
      expect(toMailHref("a@b.fr", { subject: "", body: "" })).toBe("mailto:a@b.fr");
    });

    it("encodes reserved characters that would break the query string", () => {
      expect(toMailHref("a@b.fr", { subject: "A&B=C?" })).toBe("mailto:a@b.fr?subject=A%26B%3DC%3F");
    });
  });
});

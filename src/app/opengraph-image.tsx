import { ImageResponse } from "next/og";
import { SCHOOL, SCHOOL_NAME } from "@/utils/constants/contact";
import { BRAND_COLORS } from "@/utils/constants/site";
import { getLogoDataUrl } from "./brandImage";

export const alt = SCHOOL_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview: crest + school name on the brand blue, gold tagline.
export default async function OpenGraphImage() {
  const logo = await getLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 56,
          padding: "0 90px",
          background: BRAND_COLORS.primary,
          color: BRAND_COLORS.white,
        }}
      >
        <img src={logo} width={266} height={280} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 18, width: 700 }}>
          {SCHOOL.nameLines.map((line) => (
            <div key={line} style={{ fontSize: 54, fontWeight: 900, lineHeight: 1.05, textTransform: "uppercase" }}>
              {line}
            </div>
          ))}
          <div style={{ fontSize: 32, color: BRAND_COLORS.gold }}>Collège catholique · Verfeil → Balma 2027</div>
        </div>
      </div>
    ),
    size,
  );
}

import { ImageResponse } from "next/og";
import { SCHOOL_NAME } from "@/utils/constants/contact";
import { BRAND_COLORS, SITE_TAGLINE } from "@/utils/constants/site";
import { getLogoDataUrl } from "./brandImage";

export const alt = SCHOOL_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview: crest and tagline only, on white so the navy ribbon of the crest stays visible.
export default async function OpenGraphImage() {
  const logo = await getLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40,
          background: BRAND_COLORS.white,
        }}
      >
        <img src={logo} width={304} height={320} alt="" />
        <div style={{ fontSize: 44, color: BRAND_COLORS.primary, fontWeight: 700 }}>{SITE_TAGLINE}</div>
      </div>
    ),
    size,
  );
}

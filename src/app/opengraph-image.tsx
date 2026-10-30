import { ImageResponse } from "next/og";
import { SCHOOL_NAME } from "@/utils/constants/contact";
import { BRAND_COLORS, SITE_PREVIEW } from "@/utils/constants/site";
import { getLogoDataUrl } from "./brandImage";

export const alt = SCHOOL_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social preview: crest, school name and subtitle only, on white so the navy ribbon of the crest stays visible.
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
          background: BRAND_COLORS.white,
          color: BRAND_COLORS.primary,
        }}
      >
        <img src={logo} width={266} height={280} alt="" />
        <div style={{ marginTop: 32, fontSize: 64 }}>{SITE_PREVIEW.title}</div>
        <div style={{ marginTop: 8, fontSize: 38 }}>{SITE_PREVIEW.subtitle}</div>
      </div>
    ),
    size,
  );
}

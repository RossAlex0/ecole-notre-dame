import { ImageResponse } from "next/og";
import { BRAND_COLORS } from "@/utils/constants/site";
import { renderIcon } from "./brandImage";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS home screen icons need an opaque background.
export default async function AppleIcon() {
  return new ImageResponse(await renderIcon(size.height, BRAND_COLORS.white), size);
}

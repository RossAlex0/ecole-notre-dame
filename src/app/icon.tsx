import { ImageResponse } from "next/og";
import { renderIcon } from "./brandImage";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(await renderIcon(size.height, "transparent"), size);
}

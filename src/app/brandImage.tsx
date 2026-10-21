import { readFile } from "node:fs/promises";
import path from "node:path";
import { IMAGES } from "@/utils/constants/images";

// Logo as a data URL so next/og can embed it in generated images.
export async function getLogoDataUrl(): Promise<string> {
  const file = await readFile(path.join(process.cwd(), "public", IMAGES.logo.src));
  return `data:image/png;base64,${file.toString("base64")}`;
}

// Square icon: the crest centered on a background.
export async function renderIcon(size: number, background: string) {
  const logo = await getLogoDataUrl();
  const logoHeight = Math.round(size * 0.86);
  const logoWidth = Math.round((logoHeight * IMAGES.logo.width) / IMAGES.logo.height);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain img only */}
      <img src={logo} width={logoWidth} height={logoHeight} alt="" />
    </div>
  );
}

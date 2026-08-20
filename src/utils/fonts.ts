import { fetchSection } from "../api/configClient";
import type { Theme } from "../types/config";

export function resolveHeadingFont(fieldFont: string, theme: Theme): string {
  return fieldFont || theme.fontHeading;
}

export function resolveBodyFont(fieldFont: string, theme: Theme): string {
  return fieldFont || theme.fontBody;
}

export interface FontVariant {
  url: string;
  weight: number;
  style: "normal" | "italic";
}

export interface FontFamily {
  family: string;
  variants: FontVariant[];
}

const FONT_FACE_STYLE_ID = "site-font-faces";

function buildFontFaceCss(fonts: FontFamily[]): string {
  return fonts
    .flatMap((font) =>
      font.variants.map(
        (variant) => `@font-face {
  font-family: "${font.family}";
  src: url("${variant.url}") format("woff2");
  font-weight: ${variant.weight};
  font-style: ${variant.style};
  font-display: swap;
}`,
      ),
    )
    .join("\n");
}

export async function loadSiteFonts(): Promise<void> {
  const fonts = await fetchSection<FontFamily[]>("/fonts").catch(() => []);

  let styleEl = document.getElementById(FONT_FACE_STYLE_ID);
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = FONT_FACE_STYLE_ID;
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = buildFontFaceCss(fonts);
}

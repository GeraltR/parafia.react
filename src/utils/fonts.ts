import type { Theme } from "../types/config";

export function resolveHeadingFont(fieldFont: string, theme: Theme): string {
  return fieldFont || theme.fontHeading;
}

export function resolveBodyFont(fieldFont: string, theme: Theme): string {
  return fieldFont || theme.fontBody;
}

export function isInternalRoute(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

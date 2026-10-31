export function isInternalRoute(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

/** Section anchors ("#kontakt") live on the home page, so they must lead there from any route. */
export function toRouterHref(href: string): string {
  return href.startsWith("#") ? `/${href}` : href;
}

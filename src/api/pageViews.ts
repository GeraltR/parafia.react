import { postJson } from "./configClient";

export function trackPageView(path: string, referrer: string | null): void {
  postJson<void>("/page-views", { path, referrer }).catch(() => {
    // statystyki są opcjonalne — brak sieci/API nie powinien wpływać na wyświetlanie strony
  });
}

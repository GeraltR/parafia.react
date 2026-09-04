import { useState } from "react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "parafia-cookie-notice-dismissed";

function isAlreadyDismissed(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function CookieNotice() {
  const [dismissed, setDismissed] = useState(isAlreadyDismissed);

  function handleDismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // brak dostępu do localStorage (np. tryb prywatny) — baner po prostu pokaże się ponownie przy kolejnej wizycie
    }
  }

  if (dismissed) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface-muted px-6 py-4 shadow-[0_-4px_16px_rgba(13,30,53,.12)]">
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4">
        <p className="font-body text-[0.82rem] leading-relaxed text-ink-soft">
          Strona korzysta z niezbędnych plików cookies pochodzących od usługi Google reCAPTCHA, chroniącej formularz
          kontaktowy przed spamem. Więcej informacji znajdziesz w{" "}
          <Link
            to="/polityka-prywatnosci"
            className="font-semibold text-primary underline underline-offset-2 hover:text-secondary"
          >
            Polityce prywatności
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          className="shrink-0 rounded-md bg-primary px-4 py-2 font-body text-[0.8rem] font-semibold text-white transition-colors hover:bg-secondary"
        >
          Rozumiem
        </button>
      </div>
    </div>
  );
}

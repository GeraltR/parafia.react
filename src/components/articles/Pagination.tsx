import { pageSlots } from "../../utils/pagination";

const BUTTON_CLASS =
  "min-w-9 rounded border border-border px-3 py-1.5 font-body text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40";

export function Pagination({
  currentPage,
  lastPage,
  onChange,
}: {
  currentPage: number;
  lastPage: number;
  onChange: (page: number) => void;
}) {
  if (lastPage <= 1) return null;

  return (
    <nav aria-label="Stronicowanie" className="mt-10 flex flex-wrap items-center justify-center gap-1.5">
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onChange(currentPage - 1)}
        className={`${BUTTON_CLASS} text-primary hover:bg-surface-muted`}
      >
        Poprzednia
      </button>
      {pageSlots(currentPage, lastPage).map((slot, index) =>
        slot === "gap" ? (
          <span key={`gap-${index}`} className="px-1 font-body text-sm text-ink-soft">
            …
          </span>
        ) : (
          <button
            key={`page-${slot}`}
            type="button"
            aria-current={slot === currentPage ? "page" : undefined}
            onClick={() => onChange(slot)}
            className={`${BUTTON_CLASS} ${
              slot === currentPage ? "border-primary bg-primary text-white" : "text-primary hover:bg-surface-muted"
            }`}
          >
            {slot}
          </button>
        ),
      )}
      <button
        type="button"
        disabled={currentPage >= lastPage}
        onClick={() => onChange(currentPage + 1)}
        className={`${BUTTON_CLASS} text-primary hover:bg-surface-muted`}
      >
        Następna
      </button>
    </nav>
  );
}

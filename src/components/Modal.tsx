import { useEffect, type ReactNode } from "react";

export function Modal({
  onClose,
  children,
}: {
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-0 sm:items-center sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative flex h-svh w-full flex-col bg-white shadow-xl sm:h-auto sm:max-h-[85vh] sm:max-w-xl sm:rounded-xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Zamknij"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-surface-muted hover:text-ink"
        >
          ✕
        </button>
        <div className="min-h-0 flex-1 overflow-y-auto p-6 sm:p-8">{children}</div>
      </div>
    </div>
  );
}

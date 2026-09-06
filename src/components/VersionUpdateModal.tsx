import { Modal } from "./Modal";
import { useVersionCheck } from "../hooks/useVersionCheck";

export function VersionUpdateModal() {
  const { newVersionAvailable, dismiss, refresh } = useVersionCheck();

  if (!newVersionAvailable) {
    return null;
  }

  return (
    <Modal onClose={dismiss}>
      <h2 className="mb-3 font-heading text-xl font-black text-primary">Dostępna nowa wersja strony</h2>
      <p className="mb-5 font-body text-sm leading-relaxed text-ink-soft">
        Strona została zaktualizowana. Odśwież, aby zobaczyć najnowszą wersję.
      </p>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={dismiss}
          className="rounded-md border border-border px-4 py-2 font-body text-sm font-semibold text-ink transition-colors hover:bg-surface-muted"
        >
          Nie teraz
        </button>
        <button
          type="button"
          onClick={refresh}
          className="rounded-md bg-primary px-4 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-secondary"
        >
          Odśwież
        </button>
      </div>
    </Modal>
  );
}

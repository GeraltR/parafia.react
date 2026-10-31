import { useEffect, useRef, useState, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import type { Paginated } from "../../api/configClient";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { Pagination } from "./Pagination";

const SEARCH_DELAY_MS = 1000;

export interface ListItemRenderProps {
  to: string;
  active: boolean;
  onSelect: () => void;
}

export interface ArticlesBrowserProps<T extends { id: number }> {
  basePath: string;
  fetchArchive: (search: string, page: number) => Promise<Paginated<T>>;
  fetchItem: (id: number) => Promise<T>;
  renderListItem: (item: T, props: ListItemRenderProps) => ReactNode;
  renderDetail: (item: T) => ReactNode;
}

type Status = "loading" | "ready" | "error";

function parseId(raw: string | undefined): number | null {
  const id = Number(raw);
  return raw !== undefined && Number.isInteger(id) && id > 0 ? id : null;
}

export function ArticlesBrowser<T extends { id: number }>({
  basePath,
  fetchArchive,
  fetchItem,
  renderListItem,
  renderDetail,
}: ArticlesBrowserProps<T>) {
  const selectedId = parseId(useParams<{ id?: string }>().id);

  const [searchInput, setSearchInput] = useState("");
  const [search, applySearch] = useDebouncedValue(searchInput, SEARCH_DELAY_MS);
  const [appliedSearch, setAppliedSearch] = useState(search);
  const [page, setPage] = useState(1);

  // A new filter always starts from the first page.
  if (appliedSearch !== search) {
    setAppliedSearch(search);
    setPage(1);
  }

  const [list, setList] = useState<Paginated<T>>({ data: [], currentPage: 1, lastPage: 1 });
  const [listStatus, setListStatus] = useState<Status>("loading");

  // The last selected item is kept separately so it stays visible when the filter or page hides it from the list.
  const [detail, setDetail] = useState<T | null>(null);
  const [detailStatus, setDetailStatus] = useState<Status>("ready");
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let ignore = false;
    setListStatus("loading");
    fetchArchive(appliedSearch, page)
      .then((result) => {
        if (ignore) return;
        setList(result);
        setListStatus("ready");
      })
      .catch((error: unknown) => {
        if (ignore) return;
        console.error("Nie udało się wczytać listy tematów:", error);
        setListStatus("error");
      });
    return () => {
      ignore = true;
    };
  }, [fetchArchive, appliedSearch, page]);

  const selectedFromList = list.data.find((item) => item.id === selectedId) ?? null;
  if (selectedFromList && selectedFromList !== detail) {
    setDetail(selectedFromList);
  }
  const selected = selectedFromList ?? (detail?.id === selectedId ? detail : null);
  const needsDetailFetch = selectedId !== null && selected === null && listStatus !== "loading";

  useEffect(() => {
    if (!needsDetailFetch || selectedId === null) return;
    let ignore = false;
    setDetailStatus("loading");
    fetchItem(selectedId)
      .then((item) => {
        if (ignore) return;
        setDetail(item);
        setDetailStatus("ready");
      })
      .catch((error: unknown) => {
        if (ignore) return;
        console.error("Nie udało się wczytać tematu:", error);
        setDetailStatus("error");
      });
    return () => {
      ignore = true;
    };
  }, [fetchItem, needsDetailFetch, selectedId]);

  const handleSelect = () => {
    articleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const clearFilter = () => {
    setSearchInput("");
    applySearch("");
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-9 md:grid-cols-[2fr_7fr] md:gap-11">
        <aside className="order-2 md:order-1 print:hidden" aria-label="Lista tematów">
          {listStatus === "error" && <p className="font-body text-sm text-red-600">Nie udało się wczytać listy tematów.</p>}
          {listStatus !== "error" && list.data.length === 0 && (
            <p className="font-body text-sm text-ink-soft">
              {listStatus === "loading" ? "Wczytywanie…" : search ? "Brak tematów zawierających szukaną frazę." : "Brak tematów."}
            </p>
          )}
          <div className={listStatus === "loading" ? "opacity-60 transition-opacity" : "transition-opacity"}>
            {list.data.map((item) => (
              <div key={item.id}>
                {renderListItem(item, {
                  to: `${basePath}/${item.id}`,
                  active: item.id === selectedId,
                  onSelect: handleSelect,
                })}
              </div>
            ))}
          </div>
        </aside>

        <div className="order-1 min-w-0 md:order-2">
          <div className="mb-6 flex gap-2 print:hidden">
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Szukaj…"
              aria-label="Szukaj"
              maxLength={100}
              className="min-w-0 flex-1 rounded border border-border px-3 py-2 font-body text-sm text-ink outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={clearFilter}
              disabled={searchInput === "" && search === ""}
              className="flex-shrink-0 rounded bg-primary px-4 py-2 font-body text-[0.76rem] font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              Wyczyść filtr
            </button>
          </div>

          <article ref={articleRef} className="scroll-mt-28">
            {selected && renderDetail(selected)}
            {!selected && selectedId !== null && detailStatus === "error" && (
              <p className="font-body text-ink-soft">Nie znaleziono wybranego tematu.</p>
            )}
            {!selected && selectedId !== null && detailStatus !== "error" && (
              <p className="font-body text-ink-soft">Wczytywanie…</p>
            )}
          </article>
        </div>
      </div>

      <Pagination currentPage={list.currentPage} lastPage={list.lastPage} onChange={setPage} />
    </>
  );
}

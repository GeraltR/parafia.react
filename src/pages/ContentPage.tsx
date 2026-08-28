import { useEffect, useState } from "react";
import { fetchContentTopics } from "../api/contentTopics";
import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { TopicIcon } from "../components/TopicIcon";
import type { ContentPageSlug, ContentTopic } from "../types/config";

export function ContentPage({ page, title }: { page: ContentPageSlug; title: string }) {
  const [topics, setTopics] = useState<ContentTopic[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    fetchContentTopics(page)
      .then((data) => {
        setTopics(data);
        setSelectedId(data[0]?.id ?? null);
        setStatus("ready");
      })
      .catch((error: unknown) => {
        console.error(`Nie udało się wczytać treści (/content-topics?page=${page}):`, error);
        setStatus("error");
      });
  }, [page]);

  const selected = topics.find((topic) => topic.id === selectedId) ?? null;

  return (
    <>
      <TopBar />
      <Header />
      <main className="mx-auto max-w-[1180px] px-6 py-12">
        <h1 className="mb-8 font-heading text-3xl font-bold text-primary">{title}</h1>

        {status === "loading" && <p className="font-body text-ink-soft">Wczytywanie…</p>}
        {status === "error" && (
          <p className="font-body text-red-600">Nie udało się wczytać treści.</p>
        )}
        {status === "ready" && topics.length === 0 && (
          <p className="font-body text-ink-soft">Treść w przygotowaniu.</p>
        )}

        {status === "ready" && topics.length > 0 && (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[260px_1fr]">
            <nav className="flex flex-col gap-1 print:hidden">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedId(topic.id)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-left font-body text-sm transition-colors ${
                    topic.id === selectedId
                      ? "bg-surface-muted font-semibold text-primary"
                      : "text-ink-soft hover:bg-surface-muted"
                  }`}
                >
                  <TopicIcon iconUrl={topic.iconUrl} className="h-6 w-6 shrink-0 text-secondary" />
                  {topic.title}
                </button>
              ))}
            </nav>

            {selected && (
              <article>
                <h2 className="mb-4 font-heading text-2xl font-bold text-primary">{selected.title}</h2>
                <div
                  className="rich-content font-body text-ink"
                  dangerouslySetInnerHTML={{ __html: selected.content }}
                />
              </article>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

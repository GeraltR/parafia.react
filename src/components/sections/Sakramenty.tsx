import { useEffect, useState } from "react";
import { Collapse } from "@mui/material";
import { fetchSakramentyTopics } from "../../api/contentTopics";
import { TopicIcon } from "../TopicIcon";
import type { ContentTopic } from "../../types/config";

const LG_GRID_COLS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-7",
};

function ColumnHeader({ title }: { title: string }) {
  return (
    <div className="mb-5 flex items-baseline justify-between border-b-2 border-primary pb-2.5">
      <h2 className="font-heading text-[1.05rem] font-black tracking-tight text-primary">{title}</h2>
    </div>
  );
}

export function Sakramenty() {
  const [topics, setTopics] = useState<ContentTopic[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    fetchSakramentyTopics()
      .then(setTopics)
      .catch((error: unknown) => {
        console.error('Nie udało się wczytać sekcji "Sakramenty" (/sakramenty-topics):', error);
        setTopics([]);
      });
  }, []);

  if (topics.length === 0) {
    return null;
  }

  const lgCols = LG_GRID_COLS[topics.length] ?? "lg:grid-cols-7";

  return (
    <section id="sakramenty" className="bg-white py-14">
      <div className="mx-auto max-w-[1180px] px-6">
        <ColumnHeader title="Sakramenty" />
        <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 ${lgCols}`}>
          {topics.map((topic) => {
            const isOpen = expandedId === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setExpandedId(isOpen ? null : topic.id)}
                aria-expanded={isOpen}
                className={`rounded-lg border px-4 py-6 text-center transition-colors hover:bg-surface-muted ${
                  isOpen ? "border-secondary" : "border-border"
                }`}
              >
                <TopicIcon iconUrl={topic.iconUrl} className="mx-auto mb-2.5 h-11 w-11 text-secondary" />
                <div className="font-heading text-[0.84rem] font-bold text-primary">{topic.title}</div>
              </button>
            );
          })}
        </div>
        {topics.map((topic) => (
          <Collapse key={`content-${topic.id}`} in={expandedId === topic.id} timeout="auto" unmountOnExit>
            <div className="mt-6 rounded-lg border border-border bg-surface-muted p-6">
              <h3 className="mb-3 font-heading text-lg font-bold text-primary">{topic.title}</h3>
              <div
                className="rich-content font-body text-ink"
                dangerouslySetInnerHTML={{ __html: topic.content }}
              />
            </div>
          </Collapse>
        ))}
      </div>
    </section>
  );
}

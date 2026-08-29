import { useRef, useState } from "react";
import { Modal } from "../Modal";
import { useConfig } from "../../context/configHooks";
import { formatEventDay, formatEventTime, formatIntentionDay, formatNewsDate } from "../../utils/dates";
import type { EventItem, MassIntention, MassIntentionsConfig, NewsItem } from "../../types/config";

interface IntentionDayGroup {
  date: string;
  isHoliday: boolean;
  dayDescription: string | null;
  rows: MassIntention[];
}

function groupIntentionsByDay(items: MassIntention[]): IntentionDayGroup[] {
  const groups: IntentionDayGroup[] = [];
  for (const item of items) {
    const last = groups[groups.length - 1];
    if (last && last.date === item.date) {
      last.rows.push(item);
    } else {
      groups.push({ date: item.date, isHoliday: item.isHoliday, dayDescription: item.dayDescription, rows: [item] });
    }
  }
  return groups;
}

function dayGroupColor(config: MassIntentionsConfig, group: IntentionDayGroup): string {
  if (group.isHoliday && group.dayDescription) return config.holidayDescribedColor;
  if (group.isHoliday) return config.holidayPlainColor;
  return config.weekdayColor;
}

function ColumnHeader({ title }: { title: string }) {
  return (
    <div className="mb-5 flex items-baseline justify-between border-b-2 border-primary pb-2.5">
      <h2 className="font-heading text-[1.05rem] font-black tracking-tight text-primary">{title}</h2>
    </div>
  );
}

function EventModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  const { day, month } = formatEventDay(event.date);
  return (
    <Modal onClose={onClose}>
      <div className="mb-3 flex items-center gap-3">
        <div className="w-[50px] flex-shrink-0 rounded bg-primary px-1.5 py-1.5 text-center text-white">
          <div className="font-heading text-[1.35rem] font-black leading-none">{day}</div>
          <div className="mt-0.5 font-body text-[0.63rem] font-bold uppercase tracking-wider text-secondary-light">{month}</div>
        </div>
        <div className="font-body text-sm font-semibold text-secondary">{formatEventTime(event.date, event.time)}</div>
      </div>
      <h2 className="mb-3 font-heading text-xl font-black text-primary">{event.title}</h2>
      {event.author && (
        <p className="mb-3 font-body text-xs text-ink-soft">{event.author.name}</p>
      )}
      {event.body ? (
        <div className="rich-content font-body text-ink" dangerouslySetInnerHTML={{ __html: event.body }} />
      ) : (
        <p className="font-body text-sm text-ink-soft">{event.description}</p>
      )}
    </Modal>
  );
}

function NewsModal({ news, onClose }: { news: NewsItem; onClose: () => void }) {
  return (
    <Modal onClose={onClose}>
      {news.showImageOnFullContent && (
        <img src={news.image} alt={news.title} className="mb-4 h-48 w-full rounded-lg object-cover" />
      )}
      <div className="mb-1.5 font-body text-xs font-semibold text-secondary">{formatNewsDate(news.date)}</div>
      <h2 className="mb-3 font-heading text-xl font-black text-primary">{news.title}</h2>
      {news.author && (
        <p className="mb-3 font-body text-xs text-ink-soft">{news.author.name}</p>
      )}
      {news.body ? (
        <div className="rich-content font-body text-ink" dangerouslySetInnerHTML={{ __html: news.body }} />
      ) : (
        <p className="font-body text-sm text-ink-soft">{news.excerpt}</p>
      )}
    </Modal>
  );
}

const INTENTIONS_INITIAL_DAYS = 5;
const INTENTIONS_SCROLL_OFFSET_PX = 100; // roughly 3 intention rows, so the header isn't flush with the viewport edge

export function Articles() {
  const { events, news, massIntentions } = useConfig();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showAllIntentions, setShowAllIntentions] = useState(false);
  const intentionsRef = useRef<HTMLDivElement>(null);
  const intentionGroups = groupIntentionsByDay(massIntentions.items);
  const visibleIntentionGroups = showAllIntentions
    ? intentionGroups
    : intentionGroups.slice(0, INTENTIONS_INITIAL_DAYS);
  const hiddenIntentionDays = intentionGroups.length - INTENTIONS_INITIAL_DAYS;

  function toggleIntentions() {
    if (showAllIntentions && intentionsRef.current) {
      const top =
        intentionsRef.current.getBoundingClientRect().top + window.scrollY - INTENTIONS_SCROLL_OFFSET_PX;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setShowAllIntentions((prev) => !prev);
  }

  return (
    <section id="aktualnosci" className="bg-white py-14">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid gap-9 md:grid-cols-3 md:gap-11">
          <div>
            <ColumnHeader title="Najbliższe wydarzenia" />
            {events.map((event) => {
              const { day, month } = formatEventDay(event.date);
              return (
                <button
                  key={`event-${event.id}`}
                  type="button"
                  onClick={() => setSelectedEvent(event)}
                  className="flex w-full gap-3 border-b border-border py-3.5 text-left transition-colors hover:bg-surface-muted"
                >
                  <div className="w-[50px] flex-shrink-0 rounded bg-primary px-1.5 py-1.5 text-center text-white">
                    <div className="font-heading text-[1.35rem] font-black leading-none">{day}</div>
                    <div className="mt-0.5 font-body text-[0.63rem] font-bold uppercase tracking-wider text-secondary-light">{month}</div>
                  </div>
                  <div>
                    <div className="mb-0.5 font-body text-[0.72rem] font-semibold text-secondary">{formatEventTime(event.date, event.time)}</div>
                    <h4 className="mb-0.5 font-heading text-[0.85rem] font-bold leading-snug text-primary">{event.title}</h4>
                    <p className="font-body text-[0.74rem] leading-snug text-ink-soft">{event.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div>
            <ColumnHeader title="Aktualności" />
            {news.map((item) => (
              <button
                key={`news-${item.id}`}
                type="button"
                onClick={() => setSelectedNews(item)}
                className="flex w-full gap-3 border-b border-border py-3.5 text-left transition-colors hover:bg-surface-muted"
              >
                <div className="h-[60px] w-[82px] flex-shrink-0 overflow-hidden rounded">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
                <div>
                  <div className="mb-0.5 font-body text-[0.7rem] font-semibold text-secondary">{formatNewsDate(item.date)}</div>
                  <h4 className="mb-0.5 font-heading text-[0.84rem] font-bold leading-snug text-primary">{item.title}</h4>
                  <p className="font-body text-[0.74rem] leading-snug text-ink-soft">{item.excerpt}</p>
                </div>
              </button>
            ))}
          </div>

          <div ref={intentionsRef}>
            <div className="mb-5 flex items-baseline justify-between border-b-2 border-primary pb-2.5">
              <h2 className="font-heading text-[1.05rem] font-black tracking-tight text-primary">Intencje mszalne</h2>
              <span className="font-body text-[0.72rem] text-ink-soft">Najbliższe {intentionGroups.length} dni</span>
            </div>
            <div className="overflow-hidden rounded-md border border-border">
              {visibleIntentionGroups.map((group) => (
                <div key={`intention-day-${group.date}`}>
                  <div
                    className="px-2.5 py-1.5 font-body text-[0.72rem] font-bold text-ink"
                    style={{ backgroundColor: dayGroupColor(massIntentions.config, group) }}
                  >
                    {formatIntentionDay(group.date)}
                    {group.dayDescription && ` — ${group.dayDescription}`}
                  </div>
                  {group.rows.map((row) => (
                    <div
                      key={`mass-intention-${row.id}`}
                      className="flex gap-2 border-b border-border px-2.5 py-2 font-body text-[0.78rem]"
                    >
                      <span className="flex-shrink-0 font-bold text-secondary">{row.time}</span>
                      <span className="text-ink">{row.intention}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {hiddenIntentionDays > 0 && (
              <button
                type="button"
                onClick={toggleIntentions}
                className="mt-3.5 block w-full rounded bg-primary py-2.5 text-center font-body text-[0.76rem] font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark"
              >
                {showAllIntentions ? "Pokaż mniej" : `Pokaż więcej (+${hiddenIntentionDays} dni)`}
              </button>
            )}
          </div>
        </div>
      </div>

      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      {selectedNews && <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />}
    </section>
  );
}

import { useState } from "react";
import { Modal } from "../Modal";
import { useConfig } from "../../context/configHooks";
import { formatEventDay, formatEventTime, formatIntentionGroupHeader, formatNewsDate } from "../../utils/dates";
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

/** A day's line count as displayed: the day-description line (if any) plus one line per mass. */
function groupLineCount(group: IntentionDayGroup): number {
  return (group.dayDescription ? 1 : 0) + group.rows.length;
}

/** Takes whole day-groups until at least `minLines` displayed lines are covered, always including the full day that crosses the threshold. */
function takeInitialGroups(groups: IntentionDayGroup[], minLines: number): IntentionDayGroup[] {
  const result: IntentionDayGroup[] = [];
  let lineCount = 0;
  for (const group of groups) {
    result.push(group);
    lineCount += groupLineCount(group);
    if (lineCount >= minLines) break;
  }
  return result;
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
      {news.showImageOnFullContent && news.image && (
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

function IntentionDayGroupView({ group, config }: { group: IntentionDayGroup; config: MassIntentionsConfig }) {
  const { weekdayFull, day } = formatIntentionGroupHeader(group.date);
  const color = dayGroupColor(config, group);
  return (
    <div className="border-b border-border py-2 last:border-b-0">
      <div className="mb-1 font-body text-[0.64rem] font-bold uppercase tracking-wider" style={{ color }}>
        {weekdayFull}
      </div>
      <div className="flex items-start gap-2">
        <div
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded font-heading text-[0.9rem] font-black text-primary"
          style={{ backgroundColor: color }}
        >
          {day}
        </div>
        <div className="min-w-0 flex-1">
          {group.dayDescription && (
            <div className="pt-1 pb-0.5 font-body text-[0.82rem] leading-snug font-bold text-primary">{group.dayDescription}</div>
          )}
          {group.rows.map((row) => (
            <div key={`mass-intention-${row.id}`} className="flex gap-2 py-0.5 font-body text-[0.78rem] leading-snug">
              <span className="w-11 flex-shrink-0 text-right font-bold text-secondary">{row.time}</span>
              <span className="text-ink">{row.intention}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IntentionsModal({
  groups,
  config,
  onClose,
}: {
  groups: IntentionDayGroup[];
  config: MassIntentionsConfig;
  onClose: () => void;
}) {
  return (
    <Modal onClose={onClose}>
      <h2 className="mb-3 font-heading text-xl font-black text-primary">Intencje mszalne</h2>
      {groups.map((group) => (
        <IntentionDayGroupView key={`intention-day-${group.date}`} group={group} config={config} />
      ))}
    </Modal>
  );
}

const INTENTIONS_INITIAL_LINES = 10;

export function Articles() {
  const { events, news, massIntentions } = useConfig();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showIntentionsModal, setShowIntentionsModal] = useState(false);
  const intentionGroups = groupIntentionsByDay(massIntentions.items);
  const initialIntentionGroups = takeInitialGroups(intentionGroups, INTENTIONS_INITIAL_LINES);
  const hiddenIntentionDays = intentionGroups.length - initialIntentionGroups.length;

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
                {item.image && (
                  <div className="h-[60px] w-[82px] flex-shrink-0 overflow-hidden rounded">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                )}
                <div>
                  <div className="mb-0.5 font-body text-[0.7rem] font-semibold text-secondary">{formatNewsDate(item.date)}</div>
                  <h4 className="mb-0.5 font-heading text-[0.84rem] font-bold leading-snug text-primary">{item.title}</h4>
                  <p className="font-body text-[0.74rem] leading-snug text-ink-soft">{item.excerpt}</p>
                </div>
              </button>
            ))}
          </div>

          <div>
            <div className="mb-5 flex items-baseline justify-between border-b-2 border-primary pb-2.5">
              <h2 className="font-heading text-[1.05rem] font-black tracking-tight text-primary">Intencje mszalne</h2>
              <span className="font-body text-[0.72rem] text-ink-soft">Najbliższe {intentionGroups.length} dni</span>
            </div>
            <div>
              {initialIntentionGroups.map((group) => (
                <IntentionDayGroupView key={`intention-day-${group.date}`} group={group} config={massIntentions.config} />
              ))}
            </div>
            {hiddenIntentionDays > 0 && (
              <button
                type="button"
                onClick={() => setShowIntentionsModal(true)}
                className="mt-3.5 block w-full rounded bg-primary py-2.5 text-center font-body text-[0.76rem] font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark"
              >
                {`Pokaż więcej (+${hiddenIntentionDays} dni)`}
              </button>
            )}
          </div>
        </div>
      </div>

      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
      {selectedNews && <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />}
      {showIntentionsModal && (
        <IntentionsModal
          groups={intentionGroups}
          config={massIntentions.config}
          onClose={() => setShowIntentionsModal(false)}
        />
      )}
    </section>
  );
}

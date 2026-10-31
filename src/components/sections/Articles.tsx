import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../Modal";
import { useConfig } from "../../context/configHooks";
import { formatIntentionGroupHeader } from "../../utils/dates";
import type { MassIntention, MassIntentionsConfig } from "../../types/config";
import {
  EVENTS_PATH,
  EventListItem,
  NEWS_PATH,
  NewsListItem,
  SHOW_MORE_BUTTON_CLASS,
} from "../articles/ArticleItems";

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
  const [showIntentionsModal, setShowIntentionsModal] = useState(false);
  const intentionGroups = groupIntentionsByDay(massIntentions.items);
  const initialIntentionGroups = takeInitialGroups(intentionGroups, INTENTIONS_INITIAL_LINES);
  const hiddenIntentionDays = intentionGroups.length - initialIntentionGroups.length;

  return (
    <section id="aktualnosci" className="bg-white py-14">
      <div className="mx-auto max-w-[1180px] px-6">
        <div className="grid gap-9 md:grid-cols-3 md:gap-11">
          <div>
            <ColumnHeader title="Ważne informacje" />
            {events.map((event) => (
              <EventListItem key={`event-${event.id}`} event={event} to={`${EVENTS_PATH}/${event.id}`} />
            ))}
            <Link to={EVENTS_PATH} className={SHOW_MORE_BUTTON_CLASS}>
              Pokaż więcej
            </Link>
          </div>

          <div>
            <ColumnHeader title="Aktualności" />
            {news.map((item) => (
              <NewsListItem key={`news-${item.id}`} news={item} to={`${NEWS_PATH}/${item.id}`} />
            ))}
            <Link to={NEWS_PATH} className={SHOW_MORE_BUTTON_CLASS}>
              Pokaż więcej
            </Link>
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
                className={SHOW_MORE_BUTTON_CLASS}
              >
                {`Pokaż więcej (+${hiddenIntentionDays} dni)`}
              </button>
            )}
          </div>
        </div>
      </div>

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

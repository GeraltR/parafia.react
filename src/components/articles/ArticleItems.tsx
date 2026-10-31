import { Link } from "react-router-dom";
import { formatEventDay, formatEventTime, formatNewsDate } from "../../utils/dates";
import type { EventItem, NewsItem } from "../../types/config";

export const DEFAULT_NEWS_IMAGE = "/img/elzbieta_czysta.jpg";

export const SHOW_MORE_BUTTON_CLASS =
  "mt-3.5 block w-full rounded bg-primary py-2.5 text-center font-body text-[0.76rem] font-bold uppercase tracking-wider text-white transition-colors hover:bg-primary-dark";

export const EVENTS_PATH = "/wazne-informacje";
export const NEWS_PATH = "/aktualnosci";

interface ListItemProps {
  to: string;
  active?: boolean;
  onSelect?: () => void;
}

function listItemClass(active: boolean): string {
  return `flex w-full gap-3 border-b border-border py-3.5 text-left transition-colors hover:bg-surface-muted ${
    active ? "bg-surface-muted" : ""
  }`;
}

function EventDateTile({ date }: { date: string }) {
  const { day, month } = formatEventDay(date);
  return (
    <div className="w-[50px] flex-shrink-0 rounded bg-primary px-1.5 py-1.5 text-center text-white">
      <div className="font-heading text-[1.35rem] font-black leading-none">{day}</div>
      <div className="mt-0.5 font-body text-[0.63rem] font-bold uppercase tracking-wider text-secondary-light">{month}</div>
    </div>
  );
}

export function EventListItem({ event, to, active = false, onSelect }: ListItemProps & { event: EventItem }) {
  return (
    <Link to={to} onClick={onSelect} aria-current={active ? "page" : undefined} className={listItemClass(active)}>
      <EventDateTile date={event.date} />
      <div>
        <div className="mb-0.5 font-body text-[0.72rem] font-semibold text-secondary">{formatEventTime(event.date, event.time)}</div>
        <h4 className="mb-0.5 font-heading text-[0.85rem] font-bold leading-snug text-primary">{event.title}</h4>
        <p className="font-body text-[0.74rem] leading-snug text-ink-soft">{event.description}</p>
      </div>
    </Link>
  );
}

export function NewsListItem({ news, to, active = false, onSelect }: ListItemProps & { news: NewsItem }) {
  return (
    <Link to={to} onClick={onSelect} aria-current={active ? "page" : undefined} className={listItemClass(active)}>
      <div className="h-[60px] w-[82px] flex-shrink-0 overflow-hidden rounded">
        <img src={news.image ?? DEFAULT_NEWS_IMAGE} alt={news.title} className="h-full w-full object-cover" />
      </div>
      <div>
        <div className="mb-0.5 font-body text-[0.7rem] font-semibold text-secondary">{formatNewsDate(news.date)}</div>
        <h4 className="mb-0.5 font-heading text-[0.84rem] font-bold leading-snug text-primary">{news.title}</h4>
        <p className="font-body text-[0.74rem] leading-snug text-ink-soft">{news.excerpt}</p>
      </div>
    </Link>
  );
}

export function EventDetail({ event }: { event: EventItem }) {
  return (
    <>
      <div className="mb-3 flex items-center gap-3">
        <EventDateTile date={event.date} />
        <div className="font-body text-sm font-semibold text-secondary">{formatEventTime(event.date, event.time)}</div>
      </div>
      <h2 className="mb-3 font-heading text-2xl font-black text-primary">{event.title}</h2>
      {event.author && <p className="mb-3 font-body text-xs text-ink-soft">{event.author.name}</p>}
      {event.body ? (
        <div className="rich-content font-body text-ink" dangerouslySetInnerHTML={{ __html: event.body }} />
      ) : (
        <p className="font-body text-sm text-ink-soft">{event.description}</p>
      )}
    </>
  );
}

export function NewsDetail({ news }: { news: NewsItem }) {
  return (
    <>
      <div className="mb-1.5 font-body text-xs font-semibold text-secondary">{formatNewsDate(news.date)}</div>
      <h2 className="mb-3 font-heading text-2xl font-black text-primary">{news.title}</h2>
      {news.author && <p className="mb-3 font-body text-xs text-ink-soft">{news.author.name}</p>}
      {news.showImageOnFullContent && (
        <img
          src={news.image ?? DEFAULT_NEWS_IMAGE}
          alt={news.title}
          className="mb-4 max-h-[420px] w-full rounded-lg object-cover"
        />
      )}
      {news.body ? (
        <div className="rich-content font-body text-ink" dangerouslySetInnerHTML={{ __html: news.body }} />
      ) : (
        <p className="font-body text-sm text-ink-soft">{news.excerpt}</p>
      )}
    </>
  );
}

import { fetchPaginated, fetchSection, type Paginated } from "./configClient";
import type { EventItem, NewsItem } from "../types/config";

function archiveQuery(search: string, page: number): string {
  const params = new URLSearchParams({ page: String(page) });
  if (search.trim() !== "") {
    params.set("search", search.trim());
  }
  return params.toString();
}

export function fetchEventsArchive(search: string, page: number): Promise<Paginated<EventItem>> {
  return fetchPaginated<EventItem>(`/events/archive?${archiveQuery(search, page)}`);
}

export function fetchEvent(id: number): Promise<EventItem> {
  return fetchSection<EventItem>(`/events/${id}`);
}

export function fetchNewsArchive(search: string, page: number): Promise<Paginated<NewsItem>> {
  return fetchPaginated<NewsItem>(`/news/archive?${archiveQuery(search, page)}`);
}

export function fetchNewsItem(id: number): Promise<NewsItem> {
  return fetchSection<NewsItem>(`/news/${id}`);
}

import { fetchSection } from "./configClient";
import type { ContentPageSlug, ContentTopic } from "../types/config";

export function fetchContentTopics(page: ContentPageSlug): Promise<ContentTopic[]> {
  return fetchSection<ContentTopic[]>(`/content-topics?page=${page}`);
}

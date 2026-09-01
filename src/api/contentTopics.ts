import { fetchSection } from "./configClient";
import type { ContentTopic } from "../types/config";

export function fetchSakramentyTopics(): Promise<ContentTopic[]> {
  return fetchSection<ContentTopic[]>("/sakramenty-topics");
}

export function fetchParafiaTopics(): Promise<ContentTopic[]> {
  return fetchSection<ContentTopic[]>("/parafia-topics");
}

export function fetchLiturgiaTopics(): Promise<ContentTopic[]> {
  return fetchSection<ContentTopic[]>("/liturgia-topics");
}

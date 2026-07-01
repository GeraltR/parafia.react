import { createContext } from "react";
import type {
  ContactAddresses,
  EventItem,
  FooterConfig,
  Hero,
  InfoExtra,
  MassIntention,
  Navbar,
  NewsItem,
  ShortActionItem,
  SocialLinks,
  Theme,
} from "../types/config";

export interface SiteConfig {
  theme: Theme;
  navbar: Navbar;
  hero: Hero;
  shortActions: ShortActionItem[];
  contactAddresses: ContactAddresses;
  social: SocialLinks;
  events: EventItem[];
  news: NewsItem[];
  massIntentions: MassIntention[];
  infoExtra: InfoExtra;
  footer: FooterConfig;
}

export type ConfigState =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "ready"; config: SiteConfig };

export const ConfigContext = createContext<ConfigState>({ status: "loading" });

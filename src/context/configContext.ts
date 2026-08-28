import { createContext } from "react";
import type {
  AssociationsData,
  ContactAddresses,
  EventItem,
  FooterConfig,
  Hero,
  InfoExtra,
  MassAndPastorData,
  MassIntention,
  Navbar,
  NewsItem,
  ShortActionsData,
  SocialLinks,
  Theme,
} from "../types/config";

export interface SiteConfig {
  theme: Theme;
  navbar: Navbar;
  hero: Hero;
  shortActions: ShortActionsData;
  massAndPastor: MassAndPastorData;
  associations: AssociationsData;
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

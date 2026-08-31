import { createContext } from "react";
import type {
  AssociationsData,
  ContactAddresses,
  EventItem,
  FooterConfig,
  Hero,
  InfoItem,
  MassAndPastorData,
  MassIntentionsData,
  Navbar,
  NewsItem,
  ShortActionsData,
  SocialLinks,
  Theme,
} from "../types/config";

export interface SiteConfig {
  theme: Theme;
  // Structural / chrome sections: always present, degrade to an empty-but-valid
  // shape if their fetch fails so Header/Footer/TopBar never have to hide.
  navbar: Navbar;
  contactAddresses: ContactAddresses;
  social: SocialLinks;
  events: EventItem[];
  news: NewsItem[];
  massIntentions: MassIntentionsData;
  infoItems: InfoItem[];
  // Optional content sections: null if their fetch failed, in which case the
  // section component hides itself instead of crashing the whole page.
  hero: Hero | null;
  shortActions: ShortActionsData | null;
  massAndPastor: MassAndPastorData | null;
  associations: AssociationsData | null;
  footer: FooterConfig | null;
}

export type ConfigState =
  | { status: "loading" }
  | { status: "error"; error: Error }
  | { status: "ready"; config: SiteConfig };

export const ConfigContext = createContext<ConfigState>({ status: "loading" });

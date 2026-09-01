import { useEffect, useState, type ReactNode } from "react";
import { fetchSection } from "../api/configClient";
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
import { ConfigContext, type ConfigState } from "./configContext";

const EMPTY_NAVBAR: Navbar = { items: [] };
const EMPTY_CONTACT_ADDRESSES: ContactAddresses = {
  id: 0,
  address: "",
  phone: "",
  nip: null,
  bankAccountNumber: null,
  bankName: null,
  social: {
    facebook: false,
    youtube: false,
    x: false,
    instagram: false,
    tiktok: false,
    pinterest: false,
    linkedin: false,
  },
};
const EMPTY_SOCIAL_LINKS: SocialLinks = {
  facebook: "",
  youtube: "",
  x: "",
  instagram: "",
  tiktok: "",
  pinterest: "",
  linkedin: "",
};
const EMPTY_MASS_INTENTIONS: MassIntentionsData = {
  config: { holidayDescribedColor: "#7bdcb5", holidayPlainColor: "#f78da7", weekdayColor: "#8ed1fc" },
  items: [],
};

/** Fetches a section; on failure logs to the console and resolves with `fallback` instead of rejecting. */
function fetchOrFallback<T>(path: string, label: string, fallback: T): Promise<T> {
  return fetchSection<T>(path).catch((error: unknown) => {
    console.error(`Nie udało się wczytać sekcji "${label}" (${path}):`, error);
    return fallback;
  });
}

/** Fetches an optional content section; on failure logs to the console and resolves with `null` (section hides itself). */
function fetchOrNull<T>(path: string, label: string): Promise<T | null> {
  return fetchOrFallback<T | null>(path, label, null);
}

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfigState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      // Theme is the one truly required section: without it there is no color
      // palette or font to render the page shell with, so its failure still
      // surfaces as a page-level error.
      fetchSection<Theme>("/theme"),
      fetchOrFallback<Navbar>("/navbar", "Nawigacja", EMPTY_NAVBAR),
      fetchOrFallback<ContactAddresses>("/contact-addresses", "Dane kontaktowe", EMPTY_CONTACT_ADDRESSES),
      fetchOrFallback<SocialLinks>("/social", "Media społecznościowe", EMPTY_SOCIAL_LINKS),
      fetchOrFallback<EventItem[]>("/events", "Wydarzenia", []),
      fetchOrFallback<NewsItem[]>("/news", "Aktualności", []),
      fetchOrFallback<MassIntentionsData>("/mass-intentions", "Intencje mszalne", EMPTY_MASS_INTENTIONS),
      fetchOrFallback<InfoItem[]>("/informacje", "Informacje dodatkowe", []),
      fetchOrNull<Hero>("/hero", "Hero"),
      fetchOrNull<ShortActionsData>("/short-actions", "Skróty"),
      fetchOrNull<MassAndPastorData>("/mass-and-pastor", "Msze i Duszpasterze"),
      fetchOrNull<AssociationsData>("/associations", "Wspólnoty i stowarzyszenia"),
      fetchOrNull<FooterConfig>("/footer", "Stopka"),
    ])
      .then(
        ([
          theme,
          navbar,
          contactAddresses,
          social,
          events,
          news,
          massIntentions,
          infoItems,
          hero,
          shortActions,
          massAndPastor,
          associations,
          footer,
        ]) => {
          if (cancelled) return;
          setState({
            status: "ready",
            config: {
              theme,
              navbar,
              contactAddresses,
              social,
              events,
              news,
              massIntentions,
              infoItems,
              hero,
              shortActions,
              massAndPastor,
              associations,
              footer,
            },
          });
        },
      )
      .catch((error: Error) => {
        if (cancelled) return;
        setState({ status: "error", error });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>
  );
}

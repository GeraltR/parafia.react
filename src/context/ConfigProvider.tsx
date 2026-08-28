import { useEffect, useState, type ReactNode } from "react";
import { fetchMockSection, fetchSection } from "../api/configClient";
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
import { ConfigContext, type ConfigState } from "./configContext";

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfigState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetchSection<Theme>("/theme"),
      fetchSection<Navbar>("/navbar"),
      fetchSection<Hero>("/hero"),
      fetchSection<ShortActionsData>("/short-actions"),
      fetchSection<MassAndPastorData>("/mass-and-pastor"),
      fetchSection<AssociationsData>("/associations"),
      fetchSection<ContactAddresses>("/contact-addresses"),
      fetchSection<SocialLinks>("/social"),
      fetchSection<EventItem[]>("/events"),
      fetchSection<NewsItem[]>("/news"),
      fetchMockSection<MassIntention[]>("massIntentions"),
      fetchSection<InfoExtra>("/info-extra"),
      fetchSection<FooterConfig>("/footer"),
    ])
      .then(
        ([
          theme,
          navbar,
          hero,
          shortActions,
          massAndPastor,
          associations,
          contactAddresses,
          social,
          events,
          news,
          massIntentions,
          infoExtra,
          footer,
        ]) => {
          if (cancelled) return;
          setState({
            status: "ready",
            config: {
              theme,
              navbar,
              hero,
              shortActions,
              massAndPastor,
              associations,
              contactAddresses,
              social,
              events,
              news,
              massIntentions,
              infoExtra,
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

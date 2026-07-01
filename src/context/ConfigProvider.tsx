import { useEffect, useState, type ReactNode } from "react";
import { fetchSection } from "../api/configClient";
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
import { ConfigContext, type ConfigState } from "./configContext";

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfigState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      fetchSection<Theme>("theme"),
      fetchSection<Navbar>("navbar"),
      fetchSection<Hero>("hero"),
      fetchSection<ShortActionItem[]>("shortActions"),
      fetchSection<ContactAddresses>("contactAddresses"),
      fetchSection<SocialLinks>("social"),
      fetchSection<EventItem[]>("events"),
      fetchSection<NewsItem[]>("news"),
      fetchSection<MassIntention[]>("massIntentions"),
      fetchSection<InfoExtra>("infoExtra"),
      fetchSection<FooterConfig>("footer"),
    ])
      .then(
        ([
          theme,
          navbar,
          hero,
          shortActions,
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

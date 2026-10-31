import type { ReactNode } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ArticlesBrowser } from "../components/articles/ArticlesBrowser";
import {
  EVENTS_PATH,
  EventDetail,
  EventListItem,
  NEWS_PATH,
  NewsDetail,
  NewsListItem,
} from "../components/articles/ArticleItems";
import { fetchEvent, fetchEventsArchive, fetchNewsArchive, fetchNewsItem } from "../api/articles";

function ArticlesLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <TopBar />
      <Header />
      <main className="bg-white py-12">
        <div className="mx-auto max-w-[1180px] px-6">
          <h1 className="mb-10 text-center font-heading text-3xl font-bold text-primary">{title}</h1>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

export function EventsPage() {
  return (
    <ArticlesLayout title="Ważne informacje">
      <ArticlesBrowser
        basePath={EVENTS_PATH}
        fetchArchive={fetchEventsArchive}
        fetchItem={fetchEvent}
        renderListItem={(event, props) => <EventListItem event={event} {...props} />}
        renderDetail={(event) => <EventDetail event={event} />}
      />
    </ArticlesLayout>
  );
}

export function NewsPage() {
  return (
    <ArticlesLayout title="Aktualności">
      <ArticlesBrowser
        basePath={NEWS_PATH}
        fetchArchive={fetchNewsArchive}
        fetchItem={fetchNewsItem}
        renderListItem={(news, props) => <NewsListItem news={news} {...props} />}
        renderDetail={(news) => <NewsDetail news={news} />}
      />
    </ArticlesLayout>
  );
}

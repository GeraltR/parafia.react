import type { ReactNode } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <>
      <TopBar />
      <Header />
      <main className="mx-auto max-w-[800px] px-6 py-16">
        <h1 className="mb-4 font-heading text-3xl font-bold text-primary">
          {title}
        </h1>
        {children ?? (
          <p className="font-body text-ink-soft">Treść w przygotowaniu.</p>
        )}
      </main>
      <Footer />
    </>
  );
}

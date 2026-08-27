import { useEffect } from "react";
import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";
import { ShortAction } from "../components/sections/ShortAction";
import { Sakramenty } from "../components/sections/Sakramenty";
import { Articles } from "../components/sections/Articles";
import { ContactForm } from "../components/sections/ContactForm";
import { InfoExtra } from "../components/sections/InfoExtra";

export function Home() {
  useEffect(() => {
    if (!window.location.hash) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <ShortAction />
      <Articles />
      <Sakramenty />
      <ContactForm />
      <InfoExtra />
      <Footer />
    </>
  );
}

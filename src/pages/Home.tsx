import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";
import { ShortAction } from "../components/sections/ShortAction";
import { MassAndPastor } from "../components/sections/MassAndPastor";
import { Sakramenty } from "../components/sections/Sakramenty";
import { Associations } from "../components/sections/Associations";
import { Articles } from "../components/sections/Articles";
import { ContactForm } from "../components/sections/ContactForm";
import { InfoExtra } from "../components/sections/InfoExtra";

export function Home() {
  const { hash, key } = useLocation();

  // Runs on every navigation (`key`), so menu links scroll even when already on the home page or re-clicked.
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    document.getElementById(id)?.scrollIntoView();
  }, [hash, key]);

  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <ShortAction />
      <Articles />
      <MassAndPastor />
      <Sakramenty />
      <Associations />
      <ContactForm />
      <InfoExtra />
      <Footer />
    </>
  );
}

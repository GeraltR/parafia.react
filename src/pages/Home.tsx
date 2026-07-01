import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/sections/Hero";
import { ShortAction } from "../components/sections/ShortAction";
import { Articles } from "../components/sections/Articles";
import { ContactForm } from "../components/sections/ContactForm";
import { InfoExtra } from "../components/sections/InfoExtra";

export function Home() {
  return (
    <>
      <TopBar />
      <Header />
      <Hero />
      <ShortAction />
      <Articles />
      <ContactForm />
      <InfoExtra />
      <Footer />
    </>
  );
}

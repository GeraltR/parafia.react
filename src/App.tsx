import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { fetchLiturgiaTopics, fetchParafiaTopics } from "./api/contentTopics";
import { trackPageView } from "./api/pageViews";
import { ConfigProvider } from "./context/ConfigProvider";
import { useConfigState } from "./context/configHooks";
import { SiteThemeProvider } from "./theme/SiteThemeProvider";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import { CookieNotice } from "./components/CookieNotice";
import { Home } from "./pages/Home";
import { LegalPage } from "./pages/LegalPage";
import { ContentPage } from "./pages/ContentPage";

function AppShell() {
  const state = useConfigState();
  const location = useLocation();

  useEffect(() => {
    if (state.status !== "ready") {
      return;
    }
    trackPageView(location.pathname, document.referrer || null);
  }, [location.pathname, state.status]);

  if (state.status === "loading") {
    return <div className="flex min-h-screen items-center justify-center font-body text-ink-soft">Wczytywanie…</div>;
  }

  if (state.status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center font-body text-red-600">
        Nie udało się wczytać konfiguracji strony: {state.error.message}
      </div>
    );
  }

  return (
    <SiteThemeProvider theme={state.config.theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parafia" element={<ContentPage title="Parafia" fetchTopics={fetchParafiaTopics} />} />
        <Route path="/liturgia" element={<ContentPage title="Liturgia" fetchTopics={fetchLiturgiaTopics} />} />
        <Route
          path="/polityka-prywatnosci"
          element={
            <LegalPage title="Polityka prywatności">
              {state.config.theme.privacyPolicy && (
                <div
                  className="rich-content font-body leading-relaxed text-ink-soft"
                  dangerouslySetInnerHTML={{ __html: state.config.theme.privacyPolicy }}
                />
              )}
            </LegalPage>
          }
        />
        <Route
          path="/deklaracja-dostepnosci"
          element={
            <LegalPage title="Deklaracja dostępności">
              {state.config.theme.accessibilityStatement && (
                <div
                  className="rich-content font-body leading-relaxed text-ink-soft"
                  dangerouslySetInnerHTML={{ __html: state.config.theme.accessibilityStatement }}
                />
              )}
            </LegalPage>
          }
        />
      </Routes>
      <ScrollToTopButton />
      <CookieNotice />
    </SiteThemeProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AppShell />
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;

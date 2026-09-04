import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchLiturgiaTopics, fetchParafiaTopics } from "./api/contentTopics";
import { ConfigProvider } from "./context/ConfigProvider";
import { useConfigState } from "./context/configHooks";
import { SiteThemeProvider } from "./theme/SiteThemeProvider";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import { Home } from "./pages/Home";
import { LegalPage } from "./pages/LegalPage";
import { ContentPage } from "./pages/ContentPage";

function AppShell() {
  const state = useConfigState();

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

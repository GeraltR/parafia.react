import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "./context/ConfigProvider";
import { useConfigState } from "./context/configHooks";
import { SiteThemeProvider } from "./theme/SiteThemeProvider";
import { Home } from "./pages/Home";
import { LegalPage } from "./pages/LegalPage";

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
        <Route path="/polityka-prywatnosci" element={<LegalPage title="Polityka prywatności" />} />
        <Route path="/deklaracja-dostepnosci" element={<LegalPage title="Deklaracja dostępności" />} />
      </Routes>
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

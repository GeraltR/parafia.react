import { useEffect, useMemo, type ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { Theme as SiteTheme } from "../types/config";
import { loadSiteFonts } from "../utils/fonts";

export function SiteThemeProvider({
  theme,
  children,
}: {
  theme: SiteTheme;
  children: ReactNode;
}) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", theme.primaryColor);
    root.style.setProperty("--color-secondary", theme.secondaryColor);
    root.style.setProperty(
      "--font-heading",
      `'${theme.fontHeading}', Georgia, serif`,
    );
    root.style.setProperty("--font-body", `'${theme.fontBody}', sans-serif`);
  }, [
    theme.primaryColor,
    theme.secondaryColor,
    theme.fontHeading,
    theme.fontBody,
  ]);

  useEffect(() => {
    loadSiteFonts();
  }, []);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: { main: theme.primaryColor },
          secondary: { main: theme.secondaryColor },
        },
        typography: {
          fontFamily: `'${theme.fontBody}', sans-serif`,
        },
      }),
    [theme.primaryColor, theme.secondaryColor, theme.fontBody],
  );

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>;
}

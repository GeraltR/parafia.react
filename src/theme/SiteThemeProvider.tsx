import { useEffect, useMemo, type ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { Theme as SiteTheme } from "../types/config";

function loadGoogleFont(family: string) {
  const id = `google-font-${family.replace(/\s+/g, "-").toLowerCase()}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@400;500;600;700;900&display=swap`;
  document.head.appendChild(link);
}

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
    loadGoogleFont(theme.fontHeading);
    loadGoogleFont(theme.fontBody);
  }, [
    theme.primaryColor,
    theme.secondaryColor,
    theme.fontHeading,
    theme.fontBody,
  ]);

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

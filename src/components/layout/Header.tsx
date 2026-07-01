import { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, IconButton, List, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useConfig } from "../../context/configHooks";
import { isInternalRoute } from "../../utils/links";

export function Header() {
  const { theme, navbar } = useConfig();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white shadow-[0_2px_12px_rgba(13,30,53,.07)]">
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between gap-4 px-6">
        <div className="flex flex-shrink-0 items-center gap-3">
          <img
            src="/img/logo.jpg"
            alt={`Logo ${theme.title}`}
            className="h-[52px] w-[52px] rounded-full border-2 border-secondary object-cover"
          />
          <div className="font-heading text-[0.82rem] font-bold leading-snug text-primary">
            {theme.title}
            <small className="block text-[0.72rem] font-normal text-ink-soft">{theme.subtitle}</small>
          </div>
        </div>

        <nav className="hidden items-center gap-0.5 font-body text-[0.78rem] font-semibold lg:flex">
          {navbar.items.map((item) =>
            isInternalRoute(item.href) ? (
              <Link key={`nav-${item.id}`} to={item.href} className="rounded px-2.5 py-1.5 text-ink transition-colors hover:text-secondary">
                {item.label}
              </Link>
            ) : (
              <a key={`nav-${item.id}`} href={item.href} className="rounded px-2.5 py-1.5 text-ink transition-colors hover:text-secondary">
                {item.label}
              </a>
            ),
          )}
        </nav>

        <IconButton
          aria-label="Menu"
          onClick={() => setMobileOpen(true)}
          sx={{ display: "inline-flex", "@media (min-width: 1024px)": { display: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </div>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <div className="flex w-[260px] items-center justify-between px-4 py-3">
          <span className="font-heading text-sm font-bold text-primary">{theme.title}</span>
          <IconButton onClick={() => setMobileOpen(false)} aria-label="Zamknij menu">
            <CloseIcon />
          </IconButton>
        </div>
        <List className="w-[260px]">
          {navbar.items.map((item) =>
            isInternalRoute(item.href) ? (
              <ListItemButton key={`mobile-nav-${item.id}`} component={Link} to={item.href} onClick={() => setMobileOpen(false)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ) : (
              <ListItemButton key={`mobile-nav-${item.id}`} component="a" href={item.href} onClick={() => setMobileOpen(false)}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ),
          )}
        </List>
      </Drawer>
    </header>
  );
}

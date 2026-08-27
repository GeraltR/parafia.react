import { useState } from "react";
import { Link } from "react-router-dom";
import { Collapse, Drawer, IconButton, List, ListItemButton, ListItemText, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useConfig } from "../../context/configHooks";
import { isInternalRoute } from "../../utils/links";
import type { NavItem } from "../../types/config";

function NavLinkContent({ item, className, onClick }: { item: NavItem; className: string; onClick?: () => void }) {
  return isInternalRoute(item.href) ? (
    <Link to={item.href} className={className} onClick={onClick}>
      {item.label}
    </Link>
  ) : (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
}

function DesktopNavItem({ item }: { item: NavItem }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const hasChildren = (item.children?.length ?? 0) > 0;
  const linkClassName = "rounded px-2.5 py-1.5 text-ink transition-colors hover:text-secondary";

  if (!hasChildren) {
    return <NavLinkContent item={item} className={linkClassName} />;
  }

  return (
    <div>
      <button
        type="button"
        className={`flex items-center gap-0.5 ${linkClassName}`}
        onClick={(event) => setAnchorEl(event.currentTarget)}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}
      >
        {item.label}
        <ExpandMoreIcon fontSize="small" />
      </button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {item.children!.map((child) => (
          <MenuItem
            key={`nav-child-${child.id}`}
            component={isInternalRoute(child.href) ? Link : "a"}
            to={isInternalRoute(child.href) ? child.href : undefined}
            href={!isInternalRoute(child.href) ? child.href : undefined}
            onClick={() => setAnchorEl(null)}
          >
            {child.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

function MobileNavItem({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = (item.children?.length ?? 0) > 0;

  if (!hasChildren) {
    return (
      <ListItemButton
        component={isInternalRoute(item.href) ? Link : "a"}
        to={isInternalRoute(item.href) ? item.href : undefined}
        href={!isInternalRoute(item.href) ? item.href : undefined}
        onClick={onNavigate}
      >
        <ListItemText primary={item.label} />
      </ListItemButton>
    );
  }

  return (
    <>
      <ListItemButton onClick={() => setExpanded((prev) => !prev)}>
        <ListItemText primary={item.label} />
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <List disablePadding>
          {item.children!.map((child) => (
            <ListItemButton
              key={`mobile-nav-child-${child.id}`}
              component={isInternalRoute(child.href) ? Link : "a"}
              to={isInternalRoute(child.href) ? child.href : undefined}
              href={!isInternalRoute(child.href) ? child.href : undefined}
              onClick={onNavigate}
              sx={{ pl: 4 }}
            >
              <ListItemText primary={child.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}

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
          {navbar.items.map((item) => (
            <DesktopNavItem key={`nav-${item.id}`} item={item} />
          ))}
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
          {navbar.items.map((item) => (
            <MobileNavItem key={`mobile-nav-${item.id}`} item={item} onNavigate={() => setMobileOpen(false)} />
          ))}
        </List>
      </Drawer>
    </header>
  );
}

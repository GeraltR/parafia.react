import type { ReactElement } from "react";
import type { ShortActionIcon } from "../../types/config";

type IconProps = { className?: string };

function MassIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <ellipse cx="24" cy="36" rx="13" ry="4" />
      <path d="M11 36V26c0-7 5.8-13 13-13s13 6 13 13v10" />
      <path d="M19 13V9M29 13V9M24 9V4M18 4h12" />
    </svg>
  );
}

function SacramentsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <line x1="24" y1="6" x2="24" y2="42" />
      <line x1="6" y1="24" x2="42" y2="24" />
      <circle cx="24" cy="24" r="9" />
    </svg>
  );
}

function AnnouncementsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M32 8h7v32H9V8h7" />
      <rect x="17" y="4" width="14" height="8" rx="2" />
      <path d="M20 24l4 4 8-8" />
    </svg>
  );
}

function OfficeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <rect x="8" y="16" width="32" height="24" rx="2" />
      <path d="M8 22l16 12 16-12" />
      <path d="M16 16v-5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5" />
    </svg>
  );
}

function MediaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <rect x="4" y="12" width="40" height="26" rx="4" />
      <polygon points="20 19 32 25 20 31 20 19" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ContactIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M16 10h-4a4 4 0 0 0-4 4v4c0 13 10 22 22 22h4a4 4 0 0 0 4-4v-3a1 1 0 0 0-.6-.9l-7-3a1 1 0 0 0-1.1.3l-3 3.3C19.5 30 18 28.5 16 26l3.3-3a1 1 0 0 0 .3-1.1l-3-7A1 1 0 0 0 15.6 14z" />
    </svg>
  );
}

const SHORT_ACTION_ICONS: Record<ShortActionIcon, (props: IconProps) => ReactElement> = {
  mass: MassIcon,
  sacraments: SacramentsIcon,
  announcements: AnnouncementsIcon,
  office: OfficeIcon,
  media: MediaIcon,
  contact: ContactIcon,
};

export function ShortActionIconGlyph({ icon, className }: { icon: ShortActionIcon; className?: string }) {
  const Glyph = SHORT_ACTION_ICONS[icon];
  return <Glyph className={className} />;
}

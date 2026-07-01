import type { ReactElement } from "react";
import type { HeroButton } from "../../types/config";

type IconProps = { className?: string };

function MassIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M9 21h6M12 17v4" />
      <path d="M12 3C8.5 3 6 6 6 9c0 2.5 1.5 4.5 3 6h6c1.5-1.5 3-3.5 3-6 0-3-2.5-6-6-6z" />
      <line x1="9" y1="3.5" x2="15" y2="3.5" />
    </svg>
  );
}

function AnnouncementsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function LiveIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none" />
    </svg>
  );
}

const HERO_BUTTON_ICONS: Record<HeroButton["icon"], (props: IconProps) => ReactElement> = {
  mass: MassIcon,
  announcements: AnnouncementsIcon,
  live: LiveIcon,
};

export function HeroButtonIconGlyph({ icon, className }: { icon: HeroButton["icon"]; className?: string }) {
  const Glyph = HERO_BUTTON_ICONS[icon];
  return <Glyph className={className} />;
}
